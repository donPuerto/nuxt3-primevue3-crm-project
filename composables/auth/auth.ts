import type { Provider } from '@supabase/gotrue-js' // Import the specific Provider type from the library

export function useAuth() {
  // declaration
  const router = useRouter()
  const supabase = useSupabaseAuthClient()
  const config = useRuntimeConfig()
  const redirectTo = `${config.public.BASE_URL}/confirm`

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
        console.log('Signed in:', data.user)
      // Calculate the expiration time for the session token
      // const expirationTimestamp = Date.now() + sessionDurationHours * 3600 * 1000

      // Set the expiration time for the token in the session object

      // session.expires_at = new Date(expirationTimestamp).toISOString()

      // Store the session token with the extended expiration time

      // localStorage.setItem('rememberMeToken', JSON.stringify(session.expires_at))
    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  const signInWithPassword = async (email: string, password: string, rememberMe: boolean) => {
    try {
      console.log('email', email)
      console.log('password', password)
      console.log('rememberMe', rememberMe)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error)
        console.error('Sign-in error:', error)

      // else
      //   console.log('Signed in:', data)
      // Calculate the expiration time for the session token
      // const expirationTimestamp = Date.now() + sessionDurationHours * 3600 * 1000

      // Set the expiration time for the token in the session object

      // session.expires_at = new Date(expirationTimestamp).toISOString()

      // Store the session token with the extended expiration time

      // localStorage.setItem('rememberMeToken', JSON.stringify(session.expires_at))
    }
    catch (error) {
      console.error('Error:', error)
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

  return { signInWithOAuth, signInWithPassword, signUp, signOut }
}
