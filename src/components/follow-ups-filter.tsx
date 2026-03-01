"use client";

import Link from "next/link";

export default function FollowUpsFilter({ current }: { current?: string }) {
  const isPending = current === "pending";

  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/follow-ups"
        className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
          !isPending
            ? "bg-gray-900 text-white border-gray-900"
            : "text-gray-600 border-gray-200 hover:border-gray-400"
        }`}
      >
        All
      </Link>
      <Link
        href="/dashboard/follow-ups?filter=pending"
        className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
          isPending
            ? "bg-gray-900 text-white border-gray-900"
            : "text-gray-600 border-gray-200 hover:border-gray-400"
        }`}
      >
        Pending only
      </Link>
    </div>
  );
}
