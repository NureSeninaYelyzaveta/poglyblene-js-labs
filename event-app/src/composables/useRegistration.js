import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useRegistration() {
  const loading = ref(false)
  const error = ref(null)

  const users = ref([])


  useLocalStorage('registrations', users)

  const register = async (data) => {
    loading.value = true
    error.value = null

    
    users.value.push(data)

    try {
      await new Promise((res) => setTimeout(res, 800))

      
      return true

    } catch (e) {
      error.value = 'Registration failed'
      users.value.pop()
      return false

    } finally {
      loading.value = false
    }
  }

  return { register, loading, error, users }
}