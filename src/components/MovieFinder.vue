<template>
  <form @submit.prevent="search" class="bg-white rounded elevation-1">
    <div class="form-group d-flex align-items-center">
      <label for="search" class="sr-only"></label>
      <input
        v-model="query"
        type="text"
        name="search"
        required
        class="form-control bg-white border-0"
        placeholder="search"
      />
      <button class="btn px-2 py-0" type="submit">
        <i class="mdi mdi-movie-search f-18"></i>
      </button>
    </div>
  </form>
  <div class="mt-2" v-if="pages > 0">
    <button
      class="btn me-1 text-white selectable"
      :class="{
        'btn-primary': page === currentPage,
        'btn-dark': page !== currentPage,
      }"
      :disabled="page === currentPage"
      v-for="page in pages"
      :key="page"
      @click="getPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { movieSearchService } from '../services/MovieSearchService'
import { AppState } from '../AppState'


export default {
  setup() {
    const query = ref('')
    return {
      // local vars
      query,
      // appstate computeds
      pages: computed(() => AppState.pages),
      currentPage: computed(() => AppState.currentPage),
      // methods
      async search() {
        try {
          await movieSearchService.findMovieByQuery(query.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async getPage(page) {
        try {
          await movieSearchService.findMovieByQuery(query.value, page)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>