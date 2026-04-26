<script setup>
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
</script>

<template>
  <div class="container">
    <h2> Statistics</h2>

    <div class="stats">
      <div>
        <div class="label">Total Tasks</div>
        <div class="value">{{ store.tasks.length }}</div>
      </div>

      <div>
        <div class="label">Active</div>
        <div class="value">{{ store.activeTasks.length }}</div>
      </div>

      <div>
        <div class="label">Completed</div>
        <div class="value">{{ store.completedTasks.length }}</div>
      </div>

      <div>
        <div class="label">Overdue</div>
        <div class="value">{{ store.overdueTasks.length }}</div>
      </div>
    </div>

    <h3 style="margin-top: 30px;">⏳ Upcoming (3 days)</h3>

    <div v-if="store.upcomingTasks.length === 0">
      No upcoming tasks
    </div>

    <div
      v-for="t in store.upcomingTasks"
      :key="t.id"
      class="task"
    >
      <strong>{{ t.title }}</strong>
      <div>{{ t.deadline }}</div>
    </div>
  </div>
</template>