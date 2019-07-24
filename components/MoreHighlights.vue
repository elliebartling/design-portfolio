<template>
  <div id="more-highlights" class="column is-10 is-offset-1">
    <h3>More:</h3>
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
import flattenDeep from 'lodash/flattenDeep'
export default {
  name: 'MoreHighlights',
  computed: {
    posts() {
      return this.$store.state.caseStudyPosts.filter(post => {
        let status = flattenDeep(post.post_meta['OHqA'])[0]
        return status.includes('Published')
      })
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
  margin-right: 1rem;
  margin-left: 1rem;
  a {
    color: rgba(black, .4);
  }
  a:hover {
    color: black;
    text-decoration: underline;
  }
}
</style>
