import { watch } from 'vue'

export function useLocalStorage(key, state) {
  
  const saved = localStorage.getItem(key)
  if (saved) {
    state.value = JSON.parse(saved)
  }


  watch(
    state,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: true }
  )
}