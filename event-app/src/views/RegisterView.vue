<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRegistration } from '../composables/useRegistration'

const route = useRoute()

const name = ref('')
const email = ref('')

const { register, loading, error, users } = useRegistration()

function submit() {
  if (!name.value || !email.value) return

  register({
    name: name.value,
    email: email.value,
    eventId: route.params.id
  })

  name.value = ''
  email.value = ''
}
</script>

<template>
  <div class="container">

    <h1>Register</h1>

    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />

    <button @click="submit" :disabled="loading">
      {{ loading ? 'Loading...' : 'Submit' }}
    </button>

    <p v-if="error" style="color:red">{{ error }}</p>

    <h3>Registered users</h3>

    <div v-for="u in users" :key="u.email">
      {{ u.name }} — {{ u.email }}
    </div>

  </div>
</template>