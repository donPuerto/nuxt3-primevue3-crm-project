import type { Provider } from '@supabase/gotrue-js' // Import the specific Provider type from the library

export function useAuth() {
  // declaration
  const userStore = useUserStore()
  const router: any = useRouter()
  const supabase = useSupabaseAuthClient<Database>()
  const config = useRuntimeConfig()
  const redirectTo = `${config.public.BASE_URL}/confirm`

  const authResponse = ref({
    message: '',
    error: '',
  })

  // async function rememberMeLogin() {
  //   const token = localStorage.getItem('rememberMeToken')
  //   if (token) {
  //     try {
  //       const { user, error } = await supabase.auth.api.getUser(token)
  //       if (!error && user)
  //         console.log('Logged in:', user)
  //     }
  //     catch (error) {
  //       console.error('Error:', error)
  //     }
  //   }
  // }

  const signUp = async (signUpData: SignUp) => {
    try {
      const { data, error } = await supabase.auth.signUp({
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

      if (error)
        throw error
      else
        authResponse.value.message = 'Signup was successful!'
    }
    catch (error) {
      authResponse.value.error = (error as { message?: string })?.message || 'An unknown error occurred.'
      console.log('signUp', authResponse.value.error)
    }
  }

  const signInWithPassword = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error)
        console.error('Sign-in error:', error)
    }
    catch (error) {
      authResponse.value.message = 'Signin was successful!'
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
      return { error }

    else
    //   console.log('data', data)
      return { data }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error)
      return ''

    await router.push({ path: '/auth/signin' })
  }

  return { signInWithOAuth, signInWithPassword, signUp, signOut, authResponse }
}
