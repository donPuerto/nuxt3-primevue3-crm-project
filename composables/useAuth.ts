import type { Provider } from '@supabase/gotrue-js' // Import the specific Provider type from the library

export function useAuth() {
  // declaration

  const router: any = useRouter()
  const supabase = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  const redirectTo = `${config.public.BASE_URL}/confirm`

  const testMessage: Ref<string> = ref('Hello World')

  const signUp = async (signUpData: SignUp) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password.password,
        options: {
          data: {
            first_name: signUpData.firstName,
            last_name: signUpData.lastName,
            username: signUpData.username,

          },
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        // Handle the error that occurred during signup
        throw error
      }

      // Return a success response if no errors occurred
      return { success: true, error: null }
    }
    catch (error) {
      return {
        success: false,
        error: (error as { message?: string })?.message || 'An unknown error occurred.',
      }
    }
  }

  const signInWithPassword = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error)
        throw error

      // Return a success response if no errors occurred
      return { success: true, error: null }
    }
    catch (error) {
      return {
        success: false,
        error: (error as { message?: string })?.message || 'An unknown error occurred.',
      }
    }
  }

  async function signInWithOAuth(oAuthProvider: Provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: oAuthProvider,
      options: {
        redirectTo,
      },
    })
    if (error)
      throw error
    else
      return { data }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error)
      return ''

    await router.push({ path: '/auth/signin' })
  }

  return {
    testMessage,
    signInWithOAuth,
    signInWithPassword,
    signUp,
    signOut,

  }
}
