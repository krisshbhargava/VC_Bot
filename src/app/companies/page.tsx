"use client";
import { useAuth } from '@/contexts/AuthContext';
import { BuildingOfficeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function CompaniesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to access companies</h1>
          <p className="text-gray-600">You need to be signed in to view and manage companies.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOfficeIcon className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          </div>
          <p className="text-gray-600">Manage and track companies in your investment pipeline</p>
        </div>

        {/* Not Implemented Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Coming Soon!</h3>
              <p className="text-amber-700 mb-4">
                The Companies page is currently under development. This feature will allow you to manage, 
                track, and analyze companies in your investment pipeline.
              </p>
              <div className="text-sm text-amber-600">
                Expected release: Q1 2024
              </div>
            </div>
          </div>
        </div>

        {/* Simple Feature List */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Planned Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Add and manage companies</li>
            <li>• Search and filter companies</li>
            <li>• View company analytics and metrics</li>
            <li>• Integrate with pipelines</li>
            <li>• Team collaboration tools</li>
            <li>• External data integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 