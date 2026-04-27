<script setup>
import { useEvents } from '../composables/useEvents'

const { events } = useEvents()
</script>

<template>
  <div class="container">
    <h1>Events</h1>

    <div class="card" v-for="e in events" :key="e.id">
      <h2>{{ e.title }}</h2>
      <p>{{ e.date }}</p>

      <router-link :to="`/event/${e.id}`">Details</router-link>
    </div>
  </div>
</template>