<template>
  <div class="sub-nav" >
    <a v-for="repo in starredRepos" :key="repo.full_name" :href="repo.link" target="_blank">{{ repo.full_name }}</a>
  </div>
</template>

<script>
export default {
  name: "StarredRepos",
  props: ['starredRepos'],
}
</script>

<style scoped>

</style>