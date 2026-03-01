import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://yourapp.vercel.app";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

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
  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Reminder: "${title}" is due in 5 days`,
    text: [
      `You have a follow-up from document "${filename}" due on ${formattedDate}:`,
      ``,
      `${title}`,
      description ? description : "",
      ``,
      `Mark it complete: ${APP_URL}/dashboard/follow-ups`,
    ]
      .filter((line) => line !== undefined)
      .join("\n"),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
