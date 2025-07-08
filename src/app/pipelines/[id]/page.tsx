"use client";
import { useParams } from "next/navigation";
import { useState, Suspense } from "react";
import PipelineDetailSkeleton from "./components/PipelineDetailSkeleton";
import PipelineDetailContent from "./components/PipelineDetailContent";

export default function PipelineDetailPage() {
  const { id } = useParams();
  // In a real app, fetch data here with React Query or SWR
  // For now, just pass the id to the content component
  return (
    <Suspense fallback={<PipelineDetailSkeleton />}> 
      <PipelineDetailContent pipelineId={id as string} />
    </Suspense>
  );
} 