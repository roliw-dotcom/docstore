"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number; filename: string }
  | { status: "saving" }
  | { status: "success"; filename: string }
  | { status: "error"; message: string };

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export default function UploadPage() {
  const router = useRouter();
  const supabase = createClient();
  const [uploadState, setUploadState] = useState<UploadState>({ status: "idle" });

  const uploadFile = useCallback(
    async (file: File) => {
      // Validate
      if (file.type !== "application/pdf") {
        setUploadState({ status: "error", message: "Only PDF files are supported." });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setUploadState({ status: "error", message: "File is too large. Maximum size is 20 MB." });
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUploadState({ status: "error", message: "You must be logged in to upload files." });
        return;
      }

      const docId = crypto.randomUUID();
      const storagePath = `${user.id}/${docId}/${file.name}`;

      setUploadState({ status: "uploading", progress: 10, filename: file.name });

      // Upload directly to Supabase Storage from the browser
      const { error: storageError } = await supabase.storage
        .from("documents")
        .upload(storagePath, file, { upsert: false });

      if (storageError) {
        setUploadState({ status: "error", message: storageError.message });
        return;
      }

      setUploadState({ status: "uploading", progress: 70, filename: file.name });

      // Create the DB record via our API route
      setUploadState({ status: "saving" });

      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docId,
          filename: file.name,
          storagePath,
          fileSize: file.size,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setUploadState({ status: "error", message: error ?? "Failed to save document." });
        return;
      }

      setUploadState({ status: "success", filename: file.name });

      // Trigger LLM processing in the background (Step 3)
      fetch(`/api/documents/${docId}/process`, { method: "POST" }).catch(() => {
        // Processing will be retried or can be triggered manually
      });

      setTimeout(() => router.push("/dashboard"), 1500);
    },
    [supabase, router]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadFile(acceptedFiles[0]);
      }
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: uploadState.status !== "idle" && uploadState.status !== "error",
  });

  const isIdle = uploadState.status === "idle" || uploadState.status === "error";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Document</h1>
        <p className="text-sm text-gray-500 mt-1">PDF files up to 20 MB</p>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-white"}
          ${!isIdle ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input {...getInputProps()} />

        {uploadState.status === "idle" && (
          <div className="space-y-3">
            <div className="text-5xl">📄</div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF here"}
              </p>
              <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
            </div>
          </div>
        )}

        {(uploadState.status === "uploading" || uploadState.status === "saving") && (
          <div className="space-y-4">
            <div className="text-5xl">⏳</div>
            <p className="text-lg font-medium text-gray-700">
              {uploadState.status === "saving"
                ? "Saving…"
                : `Uploading ${uploadState.filename}`}
            </p>
            {uploadState.status === "uploading" && (
              <Progress value={uploadState.progress} className="w-64 mx-auto" />
            )}
          </div>
        )}

        {uploadState.status === "success" && (
          <div className="space-y-3">
            <div className="text-5xl">✅</div>
            <p className="text-lg font-medium text-gray-700">
              {uploadState.filename} uploaded!
            </p>
            <p className="text-sm text-gray-400">Redirecting to your documents…</p>
          </div>
        )}

        {uploadState.status === "error" && (
          <div className="space-y-3">
            <div className="text-5xl">❌</div>
            <p className="text-lg font-medium text-red-600">{uploadState.message}</p>
            <p className="text-sm text-gray-400">Click or drop a file to try again</p>
          </div>
        )}
      </div>

      {isIdle && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() =>
              (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
            }
          >
            Browse files
          </Button>
        </div>
      )}
    </div>
  );
}
