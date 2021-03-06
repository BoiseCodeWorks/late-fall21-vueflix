<template>
  <div class="movie card my-2 elevation-2">
    <div class="position-absolute" style="right: 0">
      <button
        class="
          btn
          selectable
          text-secondary text-uppercase
          square-left square-bottom
          bg-dark
          fade-darken-60
        "
        title="add to favorites"
        v-if="!onMyList"
        @click.stop="addToList"
      >
        <!-- ^ @click.stop prevents any other click events that this element is inside of from triggering -->
        <i class="mdi mdi-star-outline f-24 text-secondary lighten-20"></i>
      </button>
      <button
        class="btn square-left square-bottom btn-warning"
        @click="removeFromList(movie)"
        v-else
        title="remove from favorties"
      >
        <i class="mdi mdi-star f-24"></i>
      </button>
    </div>
    <img class="movie-img" :src="movie.imgUrl" :alt="movie.title + ' poster'" />
    <div class="card-body">
      <div class="">
        <h3 class="d-flex align-items-center justify-content-between">
          <span>{{ movie.title }}</span>
          <span>{{ movie.score }}</span>
        </h3>
        <p class="clip-text">
          {{ movie.description }}
        </p>
        <div class="text-center">
          <button
            type="button"
            class="btn selectable text-secondary text-uppercase"
            data-bs-toggle="modal"
            :data-bs-target="'#m-' + movie.id"
            title="more details"
          >
            <i class="mdi mdi-chevron-up f-20"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal :id="'m-' + movie.id">
    <!-- Whatever is added in the sub-template with the #slot-name gets injected into the modal template at that slot position -->
    <template #modal-title>
      {{ movie.title }}
    </template>
    <template #modal-body>
      <div class="text-center">
        <img :src="movie.imgUrl" alt="" />
      </div>
      <div class="row py-3">
        <div class="col-md-6 d-flex align-items-center">
          <p>
            {{ movie.description }}
          </p>
        </div>
        <div class="col-md-6">
          <img :src="movie.backdrop" alt="movie poster" class="img-fluid" />
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed } from '@vue/reactivity'
import { Movie } from '../models/Movie'
import { watchlistService } from '../services/WatchlistService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'


export default {
  // child component defines the props it takes
  props: {
    movie: {
      type: Movie,
      required: true
    }
  },
  // if you ever need props within the setup they must be passed as the first argument
  setup(props) {
    return {
      onMyList: computed(() => AppState.watchlist.find(m => m.id === props.movie.id)),
      addToList() {
        logger.log('Adding', props.movie.title)
        watchlistService.addMovie(props.movie)
      },
      removeFromList() {
        watchlistService.remove(props.movie)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.movie-img {
  object-fit: cover;
  object-position: center top;
  max-height: 450px;
}
</style>