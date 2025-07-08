import React from "react";

export default function PipelineDetailSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-8">
      {/* Header skeleton */}
      <div className="h-8 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
      {/* Meta strip skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 w-24 bg-gray-200 rounded" />
        ))}
      </div>
      {/* Tabs skeleton */}
      <div className="h-10 w-40 bg-gray-200 rounded mb-4" />
      <div className="h-32 w-full bg-gray-100 rounded" />
    </div>
  );
} 