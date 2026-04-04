<template>
  <li :class="{ done: task.done }">
    <input type="checkbox" v-model="task.done" @change="$emit('toggle')" />
    <span>{{ task.text }}</span>
    <button @click="$emit('remove')">Видалити</button>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: Object
  }
};
</script>

<style>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.done span {
  text-decoration: line-through;
  color: gray;
}

button {
  cursor: pointer;
  border: none;
  background: #ff4d4f;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
}

button:hover {
  background: #d9363e;
}
</style>