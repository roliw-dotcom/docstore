import { getTranslations } from "next-intl/server";
import ChatInterface from "@/components/chat-interface";

export default async function ChatPage() {
  const t = await getTranslations("chat");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h1 className="font-serif text-2xl text-white">{t("title")}</h1>
        <p style={{ fontSize: "0.875rem", color: "#6A90AA", marginTop: "4px" }}>{t("subtitle")}</p>
      </div>
      <ChatInterface />
    </div>
  );
}
