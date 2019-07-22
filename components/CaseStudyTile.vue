<template>
  <div class="case-study-tile column is-half">
    <img :src="src" />
    <div class="meta">
      <span v-for="tag in tags">{{ tag }}</span>
      <!-- <span>{{ tags }}</span> -->
    </div>
    <h2 class="post-title">
      <router-link :to="'work/' + post.slug">
        {{ post.title }}
      </router-link>
    </h2>
  </div>
</template>

<script>
import split from 'lodash/split'
export default {
  name: 'CaseStudyTile',
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    src() {
      if (this.post.post_meta['C}:h']) {
        return 'https://www.notion.so/image/' + encodeURIComponent(
          this.post.post_meta['C}:h'][0][1][0][1]) + '?width=800'
      } else {
        return ''
      }
    },
    tags() {
      if (this.post.post_meta['[-08']) {
        return split(this.post.post_meta['[-08'][0][0], ',')
        // return this.post.post_meta['[-08'][0][0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 14px;
  margin-bottom: 2rem;
}

.post-title {
  font-size: 26px;
  line-height: 1.1;
  a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
}

.meta span {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  margin-right: 0.5rem;
}
</style>
