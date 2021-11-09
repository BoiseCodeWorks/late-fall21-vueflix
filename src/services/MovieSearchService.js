import { AppState } from "../AppState"
import { Movie } from "../models/Movie"
import { logger } from "../utils/Logger"
import { movieDB } from "./AxiosService"

const apiKey = 'api_key=545c6ef058e65396849dfbbf381cbca3&include_adult=false'

class MovieSearchService {

  async findMovieByQuery(query, page=1){
    const res = await movieDB.get(`?query=${query}&page=${page}&${apiKey}`)
    logger.log(res.data)
    const movies = res.data.results.map(m => new Movie(m))
    AppState.results = movies
    AppState.currentPage = res.data.page
    AppState.pages = res.data.total_pages
  }


}

export const movieSearchService = new MovieSearchService()