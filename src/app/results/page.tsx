"use client";
import { useEffect, useState } from "react";

type AnalysisResult = {
  company: string;
  summary: string;
  score: number;
};

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/run-analysis")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Analysis Results</h1>
      {loading ? (
        <div className="text-lg text-gray-500">Running analysis...</div>
      ) : result ? (
        <div className="bg-gray-100 p-6 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">{result.company}</h2>
          <p className="mb-2 text-gray-700">{result.summary}</p>
          <div className="font-bold text-blue-800">Score: {result.score}</div>
        </div>
      ) : (
        <div className="text-red-500">Failed to load results.</div>
      )}
    </div>
  );
} 