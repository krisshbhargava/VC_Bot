"use client";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, BuildingOffice2Icon, CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import CreatePipelineModal from "./CreatePipelineModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { Pipeline } from "@/lib/supabase";


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
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Fetch pipelines on component mount
  useEffect(() => {
    async function fetchPipelines() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/pipelines');
        if (response.ok) {
          const data = await response.json();
          setPipelines(data);
        } else {
          console.error('Failed to fetch pipelines');
        }
      } catch (error) {
        console.error('Error fetching pipelines:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchPipelines();
    }
  }, [user, authLoading]);

  const filtered = pipelines.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreatePipeline(data: PipelineFormData) {
    try {
      console.log('Creating pipeline with data:', data);
      const response = await fetch('/api/pipelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const newPipeline = await response.json();
        console.log('Created pipeline:', newPipeline);
        setPipelines([newPipeline, ...pipelines]);
        setModalOpen(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to create pipeline:', response.status, errorData);
        alert(`Failed to create pipeline: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating pipeline:', error);
      alert('Error creating pipeline. Please try again.');
    }
  }

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show auth prompt if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your pipelines</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to access your due diligence pipelines.</p>
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

  return (
    <div className="min-h-screen bg-white">
        <CreatePipelineModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreatePipeline}
          existingNames={pipelines.map(p => p.name)}
        />
        <div className="px-6 py-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Your Due Diligence Pipelines</h1>
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-pulse">
                  <div className="h-7 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
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
                      <span>{new Date(p.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{p.name}</h2>
                  <div className="text-gray-500 text-sm mb-2">
                    {p.arr_min && p.arr_max && <>ARR: ${parseInt(p.arr_min).toLocaleString()} - ${parseInt(p.arr_max).toLocaleString()} <span className="mx-1">•</span></>}
                    {p.team_min && p.team_max && <>Team: {p.team_min}-{p.team_max} <span className="mx-1">•</span></>}
                    {p.locations?.length > 0 && p.locations.join(", ")}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags?.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-3 text-gray-700 text-sm font-medium">
                    {/* TODO: Add company count when companies API is integrated */}
                    0 companies
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
} 