<script setup>
import { useRoute } from 'vue-router'
import { useEvents } from '../composables/useEvents'

const route = useRoute()
const { events } = useEvents()

const event = events.value.find(e => e.id == route.params.id)
</script>

<template>
  <div class="container" v-if="event">

    <div class="event-card">
      <h1>{{ event.title }}</h1>

      <p class="event-description">
        {{ event.description }}
      </p>

      <span class="event-date">
        {{ event.date }}
      </span>

      <div class="event-actions">
        <router-link
          :to="`/register/${event.id}`"
          class="btn register-btn"
        >
          Register
        </router-link>
      </div>

    </div>

  </div>

  <div class="container" v-else>
    <h2>Event not found</h2>
  </div>
</template>