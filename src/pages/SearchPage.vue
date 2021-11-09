<template>
  <div class="search-page container-fluid">
    <div class="row my-3">
      <div class="col-8">
        <MovieFinder />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button @click="sortByScore" v-if="name">Sort By Score</button>
        <button @click="sortByName" v-else>Sort By Name</button>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="m in movies" :key="m.id">
        <!-- Props passed to child with bound attribute -->
        <Movie :movie="m" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup() {
    const name = ref(false)
    const score = ref(true)
    return {
      name,
      score,
      // computeds replace ProxyState.on where when the data changes they trigger a re-render
      movies: computed(() => {
        const movies = AppState.results
        if (name.value) {
          return movies.sort((a, b) => {
            return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
          })
        }
        else if (score) {
          return movies.sort((a, b) => {
            return b.score - a.score
          })
        }
        return movies
      }),
      sortByName() {
        score.value = false
        name.value = true
      },
      sortByScore() {
        name.value = false
        score.value = true
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>