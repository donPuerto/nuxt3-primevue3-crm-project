export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (!user.value)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return navigateTo('/auth/signin')
})
