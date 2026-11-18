import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
let supabase

function getSupabaseClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart Vite.',
    )
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabasePublishableKey)
  }

  return supabase
}

export async function insertJoinRequest({ fullName, email, department }) {
  const { error } = await getSupabaseClient()
    .from('join_requests')
    .insert({
      full_name: fullName,
      email,
      department,
    })

  if (error) {
    throw new Error(error.message)
  }
}
