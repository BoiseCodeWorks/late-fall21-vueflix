import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const movieDB = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie',
  timeout: 8000
})