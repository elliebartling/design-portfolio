<template>
  <div id="more-highlights" class="column is-10 is-offset-1">
    <h3>More Like This</h3>
    <div class="wrap">
      <h2 class="post-title" v-for="post in posts">
        <router-link :to="`/work/${post.slug}`">
          {{ post.title }}
        </router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreHighlights',
  computed: {
    posts() {
      return this.$store.state.caseStudies.items
    }
  }
}
</script>

<style lang="scss" scoped>
#more-highlights {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4rem;
  margin-top: 8rem;
  .wrap {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}

h2.post-title {
  font-size: 22px;
  margin-right: .7rem;
  margin-left: .7rem;
  a {
    color: rgba(black, .4);
  }
  a:hover {
    color: black;
    text-decoration: underline;
  }
}
</style>
