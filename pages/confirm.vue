<script setup lang="ts">
// Meta
definePageMeta({
  layout: 'auth',
})



const { updateProfileColumnIsActiveAndUserStatus }  = useUseProfilesAPI()


const profileIsActiveAndUserStatus:ProfileIsActiveAndUserStatus = {
  is_active: true,
  user_status: 'Active'
}

function handleConfirmationButton() {
  updateProfileColumnIsActiveAndUserStatus(profileIsActiveAndUserStatus);
  // navigateTo('/dashboard/guest')
}
</script>

<template>
  <div class="card">
      <Panel header="Confirmation Page">
        <h3>Email Confirmation Successful!</h3>
        <p>Welcome to One DB app</p>
        <p>
          We're excited to have you here. <br>
          If you have any questions or need assistance, feel free to contact our support team.<br>
          Thank you for signing in <span class="font-semibold">One DB app!</span>
        </p>
       
        <p class="mt-4">
          <Button label="See Dashboard" @click="handleConfirmationButton()" />
        </p>
      </Panel>
  </div>
</template>
