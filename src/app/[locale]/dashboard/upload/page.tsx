"use client";

import { useCallback, useState } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type FileStatus = "pending" | "uploading" | "done" | "error";

interface FileItem {
  id: string;
  file: File;
  status: FileStatus;
  error?: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

async function uploadOne(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  item: FileItem,
  onStatus: (id: string, status: FileStatus, error?: string) => void
) {
  onStatus(item.id, "uploading");

  const docId = crypto.randomUUID();
  const storagePath = `${userId}/${docId}/${item.file.name}`;

  const { error: storageError } = await supabase.storage
    .from("documents")
    .upload(storagePath, item.file, { upsert: false });

  if (storageError) {
    onStatus(item.id, "error", storageError.message);
    return;
  }

  const res = await fetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      docId,
      filename: item.file.name,
      storagePath,
      fileSize: item.file.size,
      mimeType: item.file.type,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    onStatus(item.id, "error", data.error ?? "Failed to save.");
    return;
  }

  onStatus(item.id, "done");

  // Trigger LLM processing in the background
  fetch(`/api/documents/${docId}/process`, { method: "POST" }).catch(() => {});
}

export default function UploadPage() {
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations("upload");

  const [files, setFiles] = useState<FileItem[]>([]);
  const [running, setRunning] = useState(false);
  const [allDone, setAllDone] = useState(false);

  function updateStatus(id: string, status: FileStatus, error?: string) {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status, error } : f))
    );
  }

  const onDrop = useCallback((accepted: File[]) => {
    const valid = accepted.filter(
      (f) => ACCEPTED_MIME_TYPES.has(f.type) && f.size <= MAX_FILE_SIZE
    );

    const rejected = accepted.filter(
      (f) => !ACCEPTED_MIME_TYPES.has(f.type) || f.size > MAX_FILE_SIZE
    );

    const newItems: FileItem[] = valid.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      status: "pending",
    }));

    const errorItems: FileItem[] = rejected.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      status: "error",
      error: !ACCEPTED_MIME_TYPES.has(f.type)
        ? t("unsupportedType")
        : t("exceedsLimit"),
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
    },
    disabled: running,
  });

  async function startUpload() {
    const pending = files.filter((f) => f.status === "pending");
    if (!pending.length) return;

    setRunning(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "pending" ? { ...f, status: "error", error: t("notLoggedIn") } : f
        )
      );
      setRunning(false);
      return;
    }

    await Promise.all(
      pending.map((item) => uploadOne(supabase, user.id, item, updateStatus))
    );

    setRunning(false);
    setAllDone(true);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setAllDone(false);
  }

  function reset() {
    setFiles([]);
    setAllDone(false);
  }

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {/* Drop zone — always visible unless all done */}
      {!allDone && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-white"}
            ${running ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="text-4xl">📄</div>
            <p className="text-base font-medium text-gray-700">
              {isDragActive ? t("dropHere") : t("dragDrop")}
            </p>
            <p className="text-sm text-gray-400">{t("fileTypes")}</p>
          </div>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 bg-white border rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <StatusIcon status={item.status} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.file.name}
                  </p>
                  {item.error && (
                    <p className="text-xs text-red-500">{item.error}</p>
                  )}
                  {item.status === "uploading" && (
                    <p className="text-xs text-blue-500">{t("uploadingStatus")}</p>
                  )}
                  {item.status === "done" && (
                    <p className="text-xs text-green-600">{t("uploadedStatus")}</p>
                  )}
                </div>
              </div>
              {(item.status === "pending" || item.status === "error") && !running && (
                <button
                  onClick={() => removeFile(item.id)}
                  className="text-gray-300 hover:text-gray-500 text-lg leading-none flex-shrink-0"
                  title="Remove"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {!allDone && pendingCount > 0 && (
          <Button onClick={startUpload} disabled={running}>
            {running ? t("uploading") : t("uploadFiles", { count: pendingCount })}
          </Button>
        )}

        {allDone && (
          <>
            <Link href="/dashboard">
              <Button>{t("viewDocuments")}</Button>
            </Link>
            <Button variant="outline" onClick={reset}>
              {t("uploadMore")}
            </Button>
          </>
        )}

        {!allDone && files.length > 0 && !running && (
          <Button variant="outline" onClick={reset}>
            {t("clearAll")}
          </Button>
        )}
      </div>

      {/* Summary when done */}
      {allDone && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {doneCount > 0 && (
            <p>{t("uploadedSuccess", { count: doneCount })}</p>
          )}
          {errorCount > 0 && (
            <p className="text-red-600 mt-1">{t("uploadedFailed", { count: errorCount })}</p>
          )}
          <p className="text-green-600 mt-1">{t("processingNote")}</p>
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: FileStatus }) {
  if (status === "pending") return <span className="text-gray-300 text-lg">○</span>;
  if (status === "uploading") return <span className="text-blue-400 animate-pulse text-lg">●</span>;
  if (status === "done") return <span className="text-green-500 text-lg">✓</span>;
  return <span className="text-red-400 text-lg">✗</span>;
}
