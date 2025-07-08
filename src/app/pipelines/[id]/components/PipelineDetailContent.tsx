"use client";
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';

const pipeline = {
  name: "SaaS Enterprise Tools",
  tags: ["SaaS", "Enterprise Software", "B2B"],
  arr: "$10,000,000 - $100,000,000",
  team: "50 - 500 employees",
  location: "San Francisco",
  companies: 2,
};

const kpis = [
  { label: "Market Size", value: "$185.8B", color: "text-green-600", icon: "$" },
  { label: "Growth Rate", value: "18.7%", color: "text-blue-600", icon: "↗" },
];

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
  const [tab, setTab] = useState('overview');
  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header band */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{pipeline.name}</h1>
            <div className="flex flex-wrap gap-2 mb-2">
              {pipeline.tags.map((tag, i) => (
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
            <div className="font-medium text-gray-900">{pipeline.arr}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Team Size</div>
            <div className="font-medium text-gray-900">{pipeline.team}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="font-medium text-gray-900">{pipeline.location}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Companies</div>
            <div className="font-medium text-gray-900">{pipeline.companies} companies</div>
          </div>
        </div>
        {/* Tabs */}
        <Tabs.Root value={tab} onValueChange={setTab} className="w-full">
          <Tabs.List className="flex gap-2 mb-4 bg-gray-50 rounded-lg overflow-hidden" aria-label="Pipeline Detail Tabs">
            <Tabs.Trigger value="overview" className={tab === 'overview' ? 'flex-1 px-4 py-2 bg-white text-blue-700 font-semibold border-b-2 border-blue-600' : 'flex-1 px-4 py-2 text-gray-500 font-semibold'}>Industry Overview</Tabs.Trigger>
            <Tabs.Trigger value="companies" className={tab === 'companies' ? 'flex-1 px-4 py-2 bg-white text-blue-700 font-semibold border-b-2 border-blue-600' : 'flex-1 px-4 py-2 text-gray-500 font-semibold'}>Companies ({pipeline.companies})</Tabs.Trigger>
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
                      <div className="italic text-blue-900 mb-2">"{c.quote}"</div>
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