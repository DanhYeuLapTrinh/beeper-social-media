import axios from 'axios'

if (!import.meta.env.VITE_BE_API_URL) {
  throw new Error('VITE_BE_API_URL is not defined')
}

export const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_BE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
