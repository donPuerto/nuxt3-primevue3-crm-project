export function useUseProfilesAPI() {
  const user = useSupabaseUser()
  console.log('supa user', user)
  const supabase = useSupabaseClient<Database>()
  const userId: UserId = user.value?.id
  console.log('userId 1', userId)
  async function updateProfileColumnIsActiveAndUserStatus(

    updateProfileIsActiveAndUserStatus: ProfileIsActiveAndUserStatus,
  ) {
    try {
      console.log('userId 2', userId)
      console.log('updateProfileIsActiveAndUserStatus', updateProfileIsActiveAndUserStatus)
      const { data, error } = await supabase
        .from('profiles')
        .update(updateProfileIsActiveAndUserStatus)
        .eq('id', '462363f5-8c39-4d56-9cf5-a5ebe7571884')

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
    updateProfileColumnIsActiveAndUserStatus,
  }
}
