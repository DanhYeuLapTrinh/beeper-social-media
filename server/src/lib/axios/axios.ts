import axios from 'axios'

export const leetCodeAxios = axios.create({
  baseURL: process.env.LEET_CODE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
