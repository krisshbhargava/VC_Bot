"use client";
import * as Tabs from '@radix-ui/react-tabs';
import { useState, useEffect } from 'react';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { Pipeline } from '@/lib/supabase';





const notableCompanies = [
  "Salesforce", "ServiceNow", "Workday", "Slack", "Zoom", "Atlassian", "HubSpot", "Zendesk"
];

const comments = [
  {
    quote: "The future of enterprise software is about creating a single source of truth for customer data while enabling teams to collaborate seamlessly across all touchpoints.",
    author: "Marc Benioff",
    title: "CEO, Salesforce",
    source: "TechCrunch Interview 2024"
  },
  {
    quote: "Enterprise software needs to be as intuitive as consumer apps. The bar for user experience in B2B has risen dramatically.",
    author: "Stewart Butterfield",
    title: "Co-founder, Slack",
    source: "SaaStr Conference 2024"
  },
  {
    quote: "AI integration isn't just about automation—it's about augmenting human decision-making with intelligent insights at the right moment.",
    author: "Aneel Bhusri",
    title: "CEO, Workday",
    source: "Wall Street Journal"
  },
];

export default function PipelineDetailContent({ pipelineId }: { pipelineId: string }) {
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('overview');
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    async function fetchPipeline() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/pipelines/${pipelineId}`);
        if (response.ok) {
          const data = await response.json();
          setPipeline(data);
        } else if (response.status === 401) {
          router.push('/auth');
          return;
        } else if (response.status === 404) {
          setError('Pipeline not found');
        } else {
          setError('Failed to load pipeline');
        }
      } catch (error) {
        console.error('Error fetching pipeline:', error);
        setError('Failed to load pipeline');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchPipeline();
    }
  }, [pipelineId, user, authLoading, router]);

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show auth prompt if user is not logged in
  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view this pipeline</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to access pipeline details.</p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error state
  if (error || !pipeline) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pipeline not found</h1>
          <p className="text-gray-600 mb-6">{error || 'This pipeline does not exist or you do not have access to it.'}</p>
          <button
            onClick={() => router.push('/pipelines')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Back to Pipelines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header band */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{pipeline.name}</h1>
            <div className="flex flex-wrap gap-2 mb-2">
              {pipeline.tags?.map((tag, i) => (
                <span key={i} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs font-medium">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100">
              <FunnelIcon className="w-5 h-5" /> Edit Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
              <PlusIcon className="w-5 h-5" /> Add Company
            </button>
          </div>
        </header>
        {/* Meta strip as card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-500">ARR Range</div>
            <div className="font-medium text-gray-900">
              {pipeline.arr_min && pipeline.arr_max 
                ? `$${parseInt(pipeline.arr_min).toLocaleString()} - $${parseInt(pipeline.arr_max).toLocaleString()}`
                : 'Not specified'
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Team Size</div>
            <div className="font-medium text-gray-900">
              {pipeline.team_min && pipeline.team_max 
                ? `${pipeline.team_min}-${pipeline.team_max} employees`
                : 'Not specified'
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Locations</div>
            <div className="font-medium text-gray-900">
              {pipeline.locations?.length > 0 
                ? pipeline.locations.join(", ")
                : 'Not specified'
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Companies</div>
            <div className="font-medium text-gray-900">0 companies</div>
          </div>
        </div>
        {/* Tabs */}
        <Tabs.Root value={tab} onValueChange={setTab} className="w-full">
          <Tabs.List className="flex gap-2 mb-4 bg-gray-50 rounded-lg overflow-hidden" aria-label="Pipeline Detail Tabs">
            <Tabs.Trigger value="overview" className={tab === 'overview' ? 'flex-1 px-4 py-2 bg-white text-blue-700 font-semibold border-b-2 border-blue-600' : 'flex-1 px-4 py-2 text-gray-500 font-semibold'}>Industry Overview</Tabs.Trigger>
            <Tabs.Trigger value="companies" className={tab === 'companies' ? 'flex-1 px-4 py-2 bg-white text-blue-700 font-semibold border-b-2 border-blue-600' : 'flex-1 px-4 py-2 text-gray-500 font-semibold'}>Companies (0)</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💼</span>
                  <span className="text-lg font-semibold text-gray-900">Enterprise SaaS Software</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-2xl font-bold">$185.8B</span>
                  <span className="text-xs text-gray-500">Market Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-2xl font-bold">18.7%</span>
                  <span className="text-xs text-gray-500">Growth Rate</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 mb-1">Industry Summary</div>
                <div className="text-gray-700 text-sm">
                  The enterprise SaaS market continues to show robust growth driven by digital transformation initiatives, remote work adoption, and increasing demand for scalable, cloud-based solutions. Companies are prioritizing platforms that offer integration capabilities, advanced analytics, and AI-powered features.
                </div>
              </div>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 mb-1">Notable Companies</div>
                <div className="flex flex-wrap gap-2">
                  {notableCompanies.map((c, i) => (
                    <span key={i} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs font-medium cursor-pointer hover:bg-gray-300 transition">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Key Comments from Thought Leaders</div>
                <div className="space-y-4">
                  {comments.map((c, i) => (
                    <div key={i} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="italic text-blue-900 mb-2">&ldquo;{c.quote}&rdquo;</div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span><span className="font-semibold text-gray-900">{c.author}</span> - {c.title}</span>
                        <span className="text-right">{c.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="companies">
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-gray-700">Companies list goes here.</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
} 