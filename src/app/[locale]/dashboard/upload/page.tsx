"use client";

import { useCallback, useState } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { useTranslations, useLocale } from "next-intl";

type FileStatus = "pending" | "uploading" | "done" | "error";

interface FileItem {
  id: string;
  file: File;
  status: FileStatus;
  error?: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "text/markdown",
]);

async function uploadOne(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  item: FileItem,
  onStatus: (id: string, status: FileStatus, error?: string) => void,
  locale: string
) {
  onStatus(item.id, "uploading");
  const docId = crypto.randomUUID();
  const storagePath = `${userId}/${docId}/${item.file.name}`;

  const { error: storageError } = await supabase.storage
    .from("documents")
    .upload(storagePath, item.file, { upsert: false });

  if (storageError) { onStatus(item.id, "error", storageError.message); return; }

  const res = await fetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docId, filename: item.file.name, storagePath, fileSize: item.file.size, mimeType: item.file.type }),
  });

  if (!res.ok) {
    const data = await res.json();
    onStatus(item.id, "error", data.error ?? "Failed to save.");
    return;
  }

  onStatus(item.id, "done");
  fetch(`/api/documents/${docId}/process?locale=${locale}`, { method: "POST" }).catch(() => {});
}

export default function UploadPage() {
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations("upload");
  const locale = useLocale();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [running, setRunning] = useState(false);
  const [allDone, setAllDone] = useState(false);

  function updateStatus(id: string, status: FileStatus, error?: string) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status, error } : f)));
  }

  const onDrop = useCallback((accepted: File[]) => {
    const valid = accepted.filter((f) => ACCEPTED_MIME_TYPES.has(f.type) && f.size <= MAX_FILE_SIZE);
    const rejected = accepted.filter((f) => !ACCEPTED_MIME_TYPES.has(f.type) || f.size > MAX_FILE_SIZE);
    const newItems: FileItem[] = valid.map((f) => ({ id: crypto.randomUUID(), file: f, status: "pending" }));
    const errorItems: FileItem[] = rejected.map((f) => ({
      id: crypto.randomUUID(), file: f, status: "error",
      error: !ACCEPTED_MIME_TYPES.has(f.type) ? t("unsupportedType") : t("exceedsLimit"),
    }));
    setFiles((prev) => [...prev, ...newItems, ...errorItems]);
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.oasis.opendocument.text": [".odt"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    disabled: running,
  });

  async function startUpload() {
    const pending = files.filter((f) => f.status === "pending");
    if (!pending.length) return;
    setRunning(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setFiles((prev) => prev.map((f) => f.status === "pending" ? { ...f, status: "error", error: t("notLoggedIn") } : f));
      setRunning(false);
      return;
    }
    await Promise.all(pending.map((item) => uploadOne(supabase, user.id, item, updateStatus, locale)));
    setRunning(false);
    setAllDone(true);
  }

  function removeFile(id: string) { setFiles((prev) => prev.filter((f) => f.id !== id)); setAllDone(false); }
  function reset() { setFiles([]); setAllDone(false); }

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h1 className="font-serif text-2xl" style={{ color: "#1A1A2E" }}>{t("title")}</h1>
        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "4px" }}>{t("subtitle")}</p>
      </div>

      {!allDone && (
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? "#E67E22" : "rgba(0,0,0,0.15)"}`,
            borderRadius: "12px",
            padding: "clamp(28px, 5vw, 48px) 20px",
            textAlign: "center",
            cursor: running ? "not-allowed" : "pointer",
            background: isDragActive ? "rgba(230,126,34,0.06)" : "#FFFFFF",
            transition: "all 0.15s",
            opacity: running ? 0.5 : 1,
          }}
        >
          <input {...getInputProps()} />
          <p style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📄</p>
          <p style={{ fontSize: "0.95rem", fontWeight: 500, color: isDragActive ? "#E67E22" : "#374151", marginBottom: "4px" }}>
            {isDragActive ? t("dropHere") : t("dragDrop")}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{t("fileTypes")}</p>
        </div>
      )}

      {files.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {files.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "8px",
                padding: "12px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <StatusIcon status={item.status} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1A1A2E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.file.name}
                  </p>
                  {item.error && <p style={{ fontSize: "0.75rem", color: "#DC2626" }}>{item.error}</p>}
                  {item.status === "uploading" && <p style={{ fontSize: "0.75rem", color: "#2563EB" }}>{t("uploadingStatus")}</p>}
                  {item.status === "done" && <p style={{ fontSize: "0.75rem", color: "#16A34A" }}>{t("uploadedStatus")}</p>}
                </div>
              </div>
              {(item.status === "pending" || item.status === "error") && !running && (
                <button onClick={() => removeFile(item.id)} style={{ color: "rgba(0,0,0,0.25)", fontSize: "1.25rem", background: "none", border: "none", cursor: "pointer", lineHeight: 1, flexShrink: 0 }}>×</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {!allDone && pendingCount > 0 && (
          <button
            onClick={startUpload}
            disabled={running}
            style={{ background: running ? "rgba(230,126,34,0.5)" : "#E67E22", color: "white", border: "none", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", fontWeight: 600, cursor: running ? "not-allowed" : "pointer" }}
          >
            {running ? t("uploading") : t("uploadFiles", { count: pendingCount })}
          </button>
        )}
        {allDone && (
          <>
            <Link href="/dashboard">
              <button style={{ background: "#E67E22", color: "white", border: "none", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                {t("viewDocuments")}
              </button>
            </Link>
            <button onClick={reset} style={{ background: "transparent", color: "#6B7280", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", cursor: "pointer" }}>
              {t("uploadMore")}
            </button>
          </>
        )}
        {!allDone && files.length > 0 && !running && (
          <button onClick={reset} style={{ background: "transparent", color: "#6B7280", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", cursor: "pointer" }}>
            {t("clearAll")}
          </button>
        )}
      </div>

      {allDone && (
        <div style={{ padding: "14px 16px", background: "rgba(22,163,74,0.07)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "8px", fontSize: "0.875rem" }}>
          {doneCount > 0 && <p style={{ color: "#16A34A" }}>{t("uploadedSuccess", { count: doneCount })}</p>}
          {errorCount > 0 && <p style={{ color: "#DC2626", marginTop: "4px" }}>{t("uploadedFailed", { count: errorCount })}</p>}
          <p style={{ color: "#6B7280", marginTop: "4px" }}>{t("processingNote")}</p>
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: FileStatus }) {
  if (status === "pending")   return <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "1.1rem" }}>○</span>;
  if (status === "uploading") return <span style={{ color: "#2563EB", fontSize: "1.1rem" }} className="animate-pulse">●</span>;
  if (status === "done")      return <span style={{ color: "#16A34A", fontSize: "1.1rem" }}>✓</span>;
  return <span style={{ color: "#DC2626", fontSize: "1.1rem" }}>✗</span>;
}
