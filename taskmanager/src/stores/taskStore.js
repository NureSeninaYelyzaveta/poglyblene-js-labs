import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  getters: {
    activeTasks: (state) => state.tasks.filter(t => !t.completed),

    completedTasks: (state) => state.tasks.filter(t => t.completed),

    overdueTasks: (state) =>
      state.tasks.filter(t =>
        !t.completed && new Date(t.deadline) < new Date()
      ),

    tasksByCategory: (state) => {
      const res = {}
      state.tasks.forEach(t => {
        res[t.category] = (res[t.category] || 0) + 1
      })
      return res
    },

    upcomingTasks: (state) => {
      const now = new Date()
      const in3Days = new Date()
      in3Days.setDate(now.getDate() + 3)

      return state.tasks.filter(t => {
        const d = new Date(t.deadline)
        return d >= now && d <= in3Days && !t.completed
      })
    }
  },

  actions: {
    addTask(task) {
      task.id = Date.now()
      task.completed = false
      this.tasks.push(task)
    },

    updateTask(updated) {
      const i = this.tasks.findIndex(t => t.id == updated.id)
      if (i !== -1) this.tasks[i] = updated
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id != id)
    },

    toggleTask(id) {
      const t = this.tasks.find(t => t.id == id)
      if (t) t.completed = !t.completed
    }
  }
})