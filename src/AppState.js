import { reactive } from 'vue'
import { Movie } from './models/Movie'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  /** @type {Movie[]} */
  results: [],
  watchlist: [], 
  pages: 0,
  currentPage: 0
})
