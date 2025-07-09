import { supabase, type Pipeline, type Company, type Analysis } from './supabase'

// Pipeline operations
export async function createPipeline(data: Omit<Pipeline, 'id' | 'created_at' | 'updated_at'>) {
  const { data: pipeline, error } = await supabase
    .from('pipelines')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return pipeline
}

export async function getPipelines(userId?: string) {
  let query = supabase
    .from('pipelines')
    .select('*')
    .order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data: pipelines, error } = await query

  if (error) throw error
  return pipelines
}

export async function getPipeline(id: string) {
  const { data: pipeline, error } = await supabase
    .from('pipelines')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return pipeline
}

export async function updatePipeline(id: string, data: Partial<Pipeline>) {
  const { data: pipeline, error } = await supabase
    .from('pipelines')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return pipeline
}

export async function deletePipeline(id: string) {
  const { error } = await supabase
    .from('pipelines')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Company operations
export async function createCompany(data: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
  const { data: company, error } = await supabase
    .from('companies')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return company
}

export async function getCompanies(pipelineId: string) {
  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
    .eq('pipeline_id', pipelineId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return companies
}



// Analysis operations
export async function createAnalysis(data: Omit<Analysis, 'id' | 'created_at'>) {
  const { data: analysis, error } = await supabase
    .from('analyses')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return analysis
}

export async function getAnalysis(companyId: string) {
  const { data: analysis, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
  return analysis
}

 