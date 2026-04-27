import { ref } from 'vue'

const events = ref([
  { id: 1, title: 'Hackathon', description: 'Coding event', date: '2026-05-01' },
  { id: 2, title: 'Conference', description: 'Tech talks', date: '2026-05-05' },
  { id: 3, title: 'Workshop', description: 'Hands-on learning', date: '2026-05-10' }
])

export function useEvents() {
  return { events }
}