export async function sendReminderEmail({
  to,
  title,
  description,
  dueDate,
  filename,
}: {
  to: string;
  title: string;
  description?: string | null;
  dueDate: string;
  filename: string;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://yourapp.vercel.app";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const text = [
    `You have a follow-up from document "${filename}" due on ${formattedDate}:`,
    ``,
    title,
    description ?? "",
    ``,
    `Mark it complete: ${appUrl}/dashboard/follow-ups`,
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
      subject: `Reminder: "${title}" is due in 5 days`,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Resend error ${res.status}: ${body.message ?? res.statusText}`);
  }
}
