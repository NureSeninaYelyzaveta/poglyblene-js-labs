<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()

const search = ref('')
const category = ref('')
const priority = ref('')
const sort = ref('date')

const filtered = computed(() => {
  let list = store.tasks

  if (search.value) {
    list = list.filter(t =>
      t.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (category.value) {
    list = list.filter(t => t.category === category.value)
  }

  if (priority.value) {
    list = list.filter(t => t.priority === priority.value)
  }

  if (sort.value === 'date') {
    list = [...list].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }

  if (sort.value === 'priority') {
    list = [...list].sort((a, b) => b.priority - a.priority)
  }

  return list
})
</script>

<template>
  <h2>Tasks</h2>

  <input v-model="search" placeholder="Search" />
  <input v-model="category" placeholder="Category" />
  <input v-model="priority" placeholder="Priority" />

  <select v-model="sort">
    <option value="date">Sort by date</option>
    <option value="priority">Sort by priority</option>
  </select>

  <router-link to="/tasks/new">+ Add Task</router-link>

<div
  v-for="t in filtered"
  :key="t.id"
  class="task"
  :class="{ overdue: new Date(t.deadline) < new Date() }"
>
  <router-link :to="`/tasks/${t.id}`">
    <h3>{{ t.title }}</h3>
  </router-link>

  <p>Category: {{ t.category }}</p>
  <p>Priority: {{ t.priority }}</p>
  <p>Deadline: {{ t.deadline }}</p>
</div> 

</template>