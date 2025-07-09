"use client";
import Link from "next/link";
import { 
  BuildingOffice2Icon, 
  UserIcon, 
  FunnelIcon, 
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/auth/UserMenu";

export default function Navigation() {
  const { user, loading } = useAuth();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* Left: Logo and Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <BuildingOffice2Icon className="w-7 h-7 text-blue-600" />
          <span className="text-2xl font-extrabold text-gray-900">VentureScope</span>
        </Link>
        <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-medium">Due Diligence Platform</span>
      </div>
      
      {/* Right: Navigation and User Menu */}
      <div className="flex items-center gap-3">
        {/* Main Navigation */}
        {user && (
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/pipelines" 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-2.5 rounded-xl font-semibold hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-200 border border-blue-200/50"
            >
              <FunnelIcon className="w-5 h-5" />
              Pipelines
            </Link>
            <Link 
              href="/companies" 
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-5 py-2.5 rounded-xl font-semibold hover:from-emerald-100 hover:to-teal-100 hover:shadow-md transition-all duration-200 border border-emerald-200/50"
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              Companies
            </Link>
          </div>
        )}
        
        {/* User Menu */}
        {!loading && (
          user ? (
            <UserMenu />
          ) : (
            <Link 
              href="/auth" 
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50 transition"
            >
              <UserIcon className="w-5 h-5" />
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
} 