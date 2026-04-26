<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
const route = useRoute()
const router = useRouter()

const existing = store.tasks.find(t => t.id == route.params.id)

const title = ref(existing?.title || '')
const description = ref(existing?.description || '')
const category = ref(existing?.category || '')
const priority = ref(existing?.priority || 1)
const deadline = ref(existing?.deadline || '')

function save() {
  if (!title.value) {
    alert('Title required')
    return
  }

  const task = {
    id: existing?.id,
    title: title.value,
    description: description.value,
    category: category.value,
    priority: priority.value,
    deadline: deadline.value,
    completed: existing?.completed || false
  }

  if (existing) store.updateTask(task)
  else store.addTask(task)

  router.push('/')
}
</script>

<template>
<div class="container">
  <h2>Task Form</h2>

  <input v-model="title" placeholder="Title" />
  <input v-model="description" placeholder="Description" />
  <input v-model="category" placeholder="Category" />
  <input v-model="priority" type="number" />
  <input v-model="deadline" type="date" />

  <button @click="save">Save Task</button>
</div>

</template>