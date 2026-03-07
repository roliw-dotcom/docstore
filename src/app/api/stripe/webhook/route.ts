import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

// Disable body parsing — Stripe requires raw body for signature verification
export const config = { api: { bodyParser: false } };

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("[stripe/webhook] signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const serviceClient = createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        if (!userId || session.mode !== "subscription") break;

        const subscription = await getStripe().subscriptions.retrieve(
          session.subscription as string
        );

        await serviceClient.from("profiles").upsert({
          id: userId,
          stripe_customer_id: session.customer as string,
          tier: "pro",
          subscription_status: subscription.status,
          current_period_end: new Date(
            (subscription as unknown as { current_period_end: number }).current_period_end * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await serviceClient
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        const isCanceled =
          subscription.status === "canceled" ||
          subscription.cancel_at_period_end;

        await serviceClient.from("profiles").update({
          tier: isCanceled ? "free" : "pro",
          subscription_status: subscription.status,
          current_period_end: new Date(
            (subscription as unknown as { current_period_end: number }).current_period_end * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        }).eq("id", profile.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await serviceClient
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        await serviceClient.from("profiles").update({
          tier: "free",
          subscription_status: "canceled",
          updated_at: new Date().toISOString(),
        }).eq("id", profile.id);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Handler error";
    console.error(`[stripe/webhook] event ${event.type}:`, msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
