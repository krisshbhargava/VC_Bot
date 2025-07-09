import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      pipelines: {
        Row: Pipeline
        Insert: Omit<Pipeline, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Pipeline>
      }
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Company>
      }
      analyses: {
        Row: Analysis
        Insert: Omit<Analysis, 'id' | 'created_at'>
        Update: Partial<Analysis>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<User>
      }
    }
  }
}

export interface Pipeline {
  id: string
  user_id: string
  name: string
  arr_min?: string | null
  arr_max?: string | null
  team_min?: number | null
  team_max?: number | null
  locations: string[]
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  pipeline_id: string
  arr?: string | null
  team_size?: number | null
  location?: string | null
  description?: string | null
  website?: string | null
  status: 'researching' | 'contacted' | 'meeting_scheduled' | 'passed' | 'invested'
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface Analysis {
  id: string
  company_id: string
  summary: string
  score: number
  market_size?: string
  growth_rate?: string
  competitive_landscape?: string
  risks?: string
  opportunities?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  company?: string
  role?: string
  phone?: string
  timezone?: string
  email_notifications?: boolean
  analysis_complete_notifications?: boolean
  new_companies_notifications?: boolean
  pipeline_updates_notifications?: boolean
  weekly_digest?: boolean
  created_at: string
  updated_at: string
} 