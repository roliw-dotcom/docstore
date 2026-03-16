export async function sendInactivityWarningEmail({
  to,
  appUrl,
}: {
  to: string;
  appUrl: string;
}) {
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const text = [
    "Your bAIndly account has been inactive for 11 months.",
    "",
    "If you don't sign in within the next 30 days, your account and all",
    "your documents will be permanently deleted.",
    "",
    `Sign in to keep your account: ${appUrl}/login`,
    "",
    "If you no longer need your account, no action is required.",
    "",
    "— The bAIndly team",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject: "Your bAIndly account will be deleted in 30 days",
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Resend error ${res.status}: ${body.message ?? res.statusText}`);
  }
}
