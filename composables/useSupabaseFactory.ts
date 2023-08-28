import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

export default function useSupabaseFactory() {
  const config = useRuntimeConfig()
  const persistSession = ref(true)

  function togglePersistSession() {
    persistSession.value = !persistSession.value
    const supabaseConfig = {
      url: config.public.SUPABASE_URL,
      anonKey: config.public.SUPABASE_KEY,
      persistSession: persistSession.value,
    }
    return createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: supabaseConfig.persistSession,
        detectSessionInUrl: false,
      },
    })
  }
  return {
    togglePersistSession,
  }
}
