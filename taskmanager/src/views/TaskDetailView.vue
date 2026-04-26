<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()

const task = store.tasks.find(t => t.id == route.params.id)

function remove() {
  store.deleteTask(task.id)
  router.push('/')
}

function toggleDone() {
  store.toggleTask(task.id)
}
</script>

<template>
  <div class="container">


    <div v-if="task">

      <h2 :class="{ 'task-done': task.completed }">
        {{ task.title }}
      </h2>

      <p><b>Description:</b> {{ task.description }}</p>
      <p><b>Category:</b> {{ task.category }}</p>
      <p><b>Priority:</b> {{ task.priority }}</p>
      <p><b>Deadline:</b> {{ task.deadline }}</p>

      
      <div class="btn-group">

        <button
          class="btn done-btn"
          :class="task.completed ? 'done' : 'not-done'"
          @click="toggleDone"
        >
          {{ task.completed ? 'Done ✓' : 'Not done ✗' }}
        </button>

        <router-link :to="`/tasks/${task.id}/edit`">
          <button class="btn edit-btn">Edit</button>
        </router-link>

        <button class="btn delete-btn" @click="remove">
          Delete
        </button>

      </div>

    </div>

    
    <div v-else>
      <h2>Task not found</h2>
    </div>

  </div>
</template>
