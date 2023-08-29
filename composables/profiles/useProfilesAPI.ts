export function useUseProfilesAPI() {
  const supabase = useSupabaseClient<Database>()
  const user = useUserStore()
  console.log('user profile', user.getUserId)
  async function updateProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          user_status: 'Active',
          is_active: true,
        })
        .eq('id', user.getUserId)

      if (error)
        console.log('User updated error:', error)

      else
        console.log('User updated successfully:', data)
    }
    catch (error) {
      console.error('Error updating profile:', error)
    }
  }
  return {
    updateProfile,
  }
}
