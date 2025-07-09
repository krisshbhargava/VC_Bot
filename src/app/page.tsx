"use client";
import { 
  ArrowTrendingUpIcon, 
  ChartBarIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleStartAnalysis = () => {
    if (user) {
      router.push('/pipelines');
    } else {
      router.push('/auth');
    }
  };

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Deep Market Analysis",
      description: "AI-powered competitive landscape analysis and market positioning"
    },
    {
      icon: ChartBarIcon,
      title: "Financial Intelligence",
      description: "Comprehensive funding history, metrics, and growth indicators"
    },
    {
      icon: ShieldCheckIcon,
      title: "Risk Assessment",
      description: "Advanced risk scoring and due diligence automation"
    },
    {
      icon: GlobeAltIcon,
      title: "Real-time Data",
      description: "Live news monitoring, sentiment analysis, and market updates"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Investing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI platform combines cutting-edge technology with deep market expertise 
              to deliver actionable insights that drive better investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How VentureScope Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your investment research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add Companies</h3>
              <p className="text-gray-600">Import companies into your pipeline or add them manually with our intelligent data enrichment.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes market position, competitors, funding history, and news sentiment automatically.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make Decisions</h3>
              <p className="text-gray-600">Get comprehensive reports and insights to make confident investment decisions with data-driven intelligence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading VCs
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of venture capital firms using VentureScope
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;VentureScope has transformed our due diligence process. We can now analyze companies 10x faster with better insights.&rdquo;
              </p>
              <div className="font-semibold text-gray-900">Sarah Chen</div>
              <div className="text-sm text-gray-600">Partner, Tech Ventures</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;The AI insights are incredibly accurate. It&apos;s like having a team of analysts working 24/7.&rdquo;
              </p>
              <div className="font-semibold text-gray-900">Michael Rodriguez</div>
              <div className="text-sm text-gray-600">Managing Director, Growth Capital</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Finally, a platform that understands what VCs need. The competitive analysis is game-changing.&rdquo;
              </p>
              <div className="font-semibold text-gray-900">Emily Watson</div>
              <div className="text-sm text-gray-600">Principal, Innovation Fund</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Investment Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of VCs who are already using AI to make better investment decisions.
          </p>
          <button
            onClick={handleStartAnalysis}
            className="bg-white text-blue-600 px-8 py-4 font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
