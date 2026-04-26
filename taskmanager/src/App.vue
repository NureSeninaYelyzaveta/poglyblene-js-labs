<template>
  <nav>
    <router-link to="/">Tasks</router-link>
    <router-link to="/tasks/new">New Task</router-link>
    <router-link to="/stats">Stats</router-link>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>