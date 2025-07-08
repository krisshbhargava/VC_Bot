"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [company, setCompany] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fafc] to-white p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          AI-Powered Due Diligence for<br />
          <span className="text-blue-600">Venture Capital</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Streamline your investment research with comprehensive company analysis, market intelligence, and competitive insights powered by advanced AI and real-time data.
        </p>
      </div>
      <div className="bg-white/80 rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center border border-gray-100">
        <div className="flex items-center mb-2">
          <ArrowTrendingUpIcon className="w-7 h-7 text-blue-500 mr-2" />
          <span className="text-2xl font-bold text-gray-900">Company Due Diligence</span>
        </div>
        <p className="text-gray-500 mb-6 text-center">
          Enter a company name to begin comprehensive market research and analysis
        </p>
        <div className="flex w-full mb-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 bg-white placeholder-gray-400"
              placeholder="Enter company name (e.g., Stripe, Airbnb, Notion)"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition mb-2 shadow"
          // onClick={...} // Add navigation/logic here
        >
          Start Due Diligence Analysis
        </button>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Our AI will analyze market position, competitors, funding history, news sentiment, and more
        </p>
      </div>
    </div>
  );
}
