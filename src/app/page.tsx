"use client";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleStartAnalysis = () => {
    if (user) {
      // If user is signed in, go to pipelines
      router.push('/pipelines');
    } else {
      // If user is not signed in, go to auth
      router.push('/auth');
    }
  };

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
          Start managing your due diligence pipelines and company analysis
        </p>
        <button
          onClick={handleStartAnalysis}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition mb-2 shadow"
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
