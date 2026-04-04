<template>
  <div id="app">
    <h1>Мій ToDo App</h1>

    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Додати задачу"
    />
    <button @click="addTask">Додати</button>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" v-model="task.done" />
        <span :class="{ done: task.done }">{{ task.text }}</span>
        <button @click="removeTask(task.id)">Видалити</button>
      </li>
    </ul>

    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Всі</button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Активні</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Виконані</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      newTask: "",
      tasks: [],
      filter: "all",
      nextId: 1
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "active") {
        return this.tasks.filter(task => !task.done);
      } else if (this.filter === "completed") {
        return this.tasks.filter(task => task.done);
      }
      return this.tasks;
    }
  },
  methods: {
    addTask() {
      const text = this.newTask.trim();
      if (text) {
        this.tasks.push({
          id: this.nextId++,
          text,
          done: false
        });
        this.newTask = "";
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  width: 400px;
  margin: 50px auto;
  text-align: center;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 65%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 10px;
  margin: 5px;
  border: none;
  background: #42b883;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

li input[type="checkbox"] {
  margin-right: 15px;
  flex-shrink: 0; 
  width: 20px;
  height: 20px;
  cursor: pointer;
}

li span {
  flex-grow: 1; 
  word-break: break-word; 
}

.done {
  text-decoration: line-through;
  color: gray;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.filters {
  margin-top: 15px;
}

.filters button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>