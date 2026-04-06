<template>
  <div class="gallery-app">
    

    <!-- Поиск по автору -->
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Пошук по автору..."
    />

    <!-- Переключатель категорий -->
    <div class="filter-buttons">
      <button @click="filterMode = 'all'" :class="{active: filterMode === 'all'}">Усі</button>
      <button @click="filterMode = 'favorites'" :class="{active: filterMode === 'favorites'}">Обрані</button>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading">Завантаження...</div>

    <!-- Сообщение об ошибке -->
    <div v-if="error">{{ error }}</div>

    <!-- Галерея изображений -->
    <div class="gallery-grid">
      <div 
        v-for="image in filteredImages" 
        :key="image.id" 
        class="image-card"
      >
        <img :src="image.download_url" :alt="image.author" />
        <p>{{ image.author }}</p>
        <button @click="toggleFavorite(image.id)">
          {{ favorites.includes(image.id) ? '💖 Видалити з обраних' : '🤍 Додати в обране' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Основные переменные состояния
const images = ref([]);
const isLoading = ref(false);
const error = ref(null);
const favorites = ref([]);
const searchQuery = ref('');
const filterMode = ref('all'); // all или favorites

// Функция загрузки данных с API
async function loadImages() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
    if (!response.ok) throw new Error('Помилка при завантаженні зображень');
    const data = await response.json();
    images.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

// Переключение избранного
function toggleFavorite(id) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter(fav => fav !== id);
  } else {
    favorites.value.push(id);
  }
}

// Фильтрация + поиск
const filteredImages = computed(() => {
  let filtered = images.value;
  
  // Фильтр по категории
  if (filterMode.value === 'favorites') {
    filtered = filtered.filter(img => favorites.value.includes(img.id));
  }

  // Поиск по автору
  if (searchQuery.value.trim() !== '') {
    filtered = filtered.filter(img => 
      img.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

// Загружаем данные при монтировании
onMounted(loadImages);
</script>

<style scoped>
.gallery-app {
  max-width: 900px;
  margin: auto;
  font-family: Arial, sans-serif;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.filter-buttons {
  margin-bottom: 12px;
}

button {
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
}

button.active {
  font-weight: bold;
  border-bottom: 2px solid red;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.image-card {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.image-card img {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 6px;
}

/* Основной стиль кнопок */
button {
  margin-right: 8px;
  padding: 8px 16px;
  cursor: pointer;
  border: 2px solid #5c2e81;
  border-radius: 6px;
  background-color: #fff;
  color: #703f97;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

/* Hover эффект */
button:hover {
  background-color: #8559a8;
  color: #fff;
  transform: scale(1.05);
}

/* Активная кнопка */
button.active {
  background-color: #703f97;
  color: #fff;
  border-color: #5c2e81;
}

</style>