import axios from 'axios'

export const baseURL = 'https://swapi.dev/api/'

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
