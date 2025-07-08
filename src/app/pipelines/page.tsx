"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, BuildingOffice2Icon, CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import CreatePipelineModal from "./CreatePipelineModal";
import { useRouter } from "next/navigation";

const initialPipelines = [
  {
    id: 1,
    name: "SaaS Enterprise Tools",
    arr: "$10,000,000 - $100,000,000",
    team: "50-500",
    location: "San Francisco",
    tags: ["SaaS", "Enterprise Software", "B2B"],
    companies: 15,
    updated: "2 days ago",
    syncing: false,
  },
  {
    id: 2,
    name: "FinTech Startups",
    arr: "$1,000,000 - $50,000,000",
    team: "10-200",
    location: "New York",
    tags: ["FinTech", "Payments", "Banking"],
    companies: 8,
    updated: "1 week ago",
    syncing: false,
  },
];

type PipelineFormData = {
  name: string;
  arrMin: string;
  arrMax: string;
  teamMin: string;
  teamMax: string;
  locations: string[];
  tags: string[];
};

export default function PipelinesPage() {
  const [search, setSearch] = useState("");
  const [pipelines, setPipelines] = useState(initialPipelines);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const filtered = pipelines.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreatePipeline(data: PipelineFormData) {
    setModalOpen(false);
    setPipelines([
      {
        id: Date.now(),
        name: data.name,
        arr: data.arrMin && data.arrMax ? `$${Number(data.arrMin).toLocaleString()} - $${Number(data.arrMax).toLocaleString()}` : "",
        team: data.teamMin && data.teamMax ? `${data.teamMin}-${data.teamMax}` : "",
        location: data.locations?.join(", ") || "",
        tags: data.tags || [],
        companies: 0,
        updated: "Syncing...",
        syncing: true,
      },
      ...pipelines,
    ]);
    // Simulate sync complete after 2s
    setTimeout(() => {
      setPipelines(pipes => pipes.map(p => p.syncing ? { ...p, syncing: false, updated: "Just now" } : p));
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      <CreatePipelineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreatePipeline}
        existingNames={pipelines.map(p => p.name)}
      />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Due Diligence Pipelines</h1>
        <p className="text-gray-600 mb-8">Manage your investment research and company analysis pipelines</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="relative w-full sm:max-w-xs">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 bg-white placeholder-gray-400"
              placeholder="Search pipelines..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search pipelines"
            />
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-base transition shadow self-end sm:self-auto"
            onClick={() => setModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5" /> New Pipeline
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-md transition cursor-pointer outline-none"
              tabIndex={0}
              role="listitem"
              aria-label={p.name}
              onClick={() => router.push(`/pipelines/${p.id}`)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/pipelines/${p.id}`); }}
            >
              <div className="flex items-start justify-between mb-2">
                <BuildingOffice2Icon className="w-7 h-7 text-blue-600" />
                <div className="flex items-center gap-1 text-gray-900 text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{p.updated}{p.syncing && <span className="ml-1 animate-spin inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full align-middle"></span>}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{p.name}</h2>
              <div className="text-gray-500 text-sm mb-2">
                {p.arr && <>ARR: {p.arr} <span className="mx-1">•</span></>}
                {p.team && <>Team: {p.team} <span className="mx-1">•</span></>}
                {p.location}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 text-gray-700 text-sm font-medium">
                {p.companies} companies
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 