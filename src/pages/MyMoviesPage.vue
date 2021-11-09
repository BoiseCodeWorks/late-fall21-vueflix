<template>
  <div class="my-movies-page container-fluid">
    <div class="row mt-3">
      <div class="col-12 text-center">
        <h2>My Watchlist</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="m in movies" :key="m.id">
        <Movie :movie="m" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      movies: computed(() => AppState.watchlist)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>