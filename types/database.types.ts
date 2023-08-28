import type { PostgrestError } from '@supabase/supabase-js'

import type { MergeDeep } from 'type-fest'
import type { Database as DB } from '@/types/database-generated.types'

export type DatabaseGenerated = MergeDeep<
  DB,
  {
    public: {
      Views: {
        profiles_view: {
          Row: {
            // id is a primary key in public.profiles, so it must be `not null`
            id: number
          }
        }
      }
    }
  }
>

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

declare global {
  type Database = DB
  type ProfileType = DB['public']['Tables']['profiles']['Row']
  type DbResult<T> = T extends PromiseLike<infer U> ? U : never
  type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
  type DbResultErr = PostgrestError
}
