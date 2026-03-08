"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Page controls */}
      {numPages > 1 && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
          >
            ← Prev
          </Button>
          <span className="text-sm text-gray-500">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
          >
            Next →
          </Button>
        </div>
      )}

      {/* PDF Document */}
      <div className="border rounded-lg overflow-hidden shadow-sm bg-white w-full">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setPageNumber(1);
            setError(null);
          }}
          onLoadError={(err) => {
            console.error("[PdfViewer] load error:", err);
            setError(err.message);
          }}
          loading={
            <div className="flex items-center justify-center h-64 text-gray-400">
              Loading PDF…
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 gap-2 text-red-400 text-sm px-4 text-center">
              <span>Failed to load PDF.</span>
              {error && <span className="text-xs text-red-300">{error}</span>}
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={600}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
}
