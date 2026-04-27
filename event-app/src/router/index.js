import { createRouter, createWebHistory } from 'vue-router'

import EventsListView from '../views/EventsListView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', component: EventsListView },
  { path: '/event/:id', component: EventDetailView },
  { path: '/register/:id', component: RegisterView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})