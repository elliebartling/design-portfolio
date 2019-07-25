<template>
  <div class="case-study-tile column is-half">
    <img :src="src" />
    <div class="meta indent-xs">
      <span>{{ tags }}</span>
      <!-- <span>{{ tags }}</span> -->
    </div>
    <h2 class="post-title indent-xs">
      <router-link :to="'work/' + post.slug">
        {{ post.title }}
      </router-link>
    </h2>
    <p class="post-meta indent-xs">{{ excerpt }}</p>
  </div>
</template>

<script>
import split from 'lodash/split'
import flattenDeep from 'lodash/flattenDeep'
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
        return split(this.post.post_meta['[-08'][0][0], ',').join(', ')
        // return this.post.post_meta['[-08'][0][0]
      }
    },
    excerpt() {
      return this.post.post_meta['t/6m'] ? flattenDeep(this.post.post_meta['t/6m'])[0] : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.case-study-tile {
  margin-bottom: 6rem;
  .indent-xs {
    margin-left: 5%;
    margin-right: 5%;
  }

  @media only screen and (min-width: 700px) {
    .indent-xs {
      margin-left: 0%;
      margin-right: 0%;
    }
  }
}

h3 {
  font-size: 14px;
  margin-bottom: 2rem;
}

.post-title {
  font-size: 32px;
  line-height: 1;
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
  margin-bottom: 0.7rem;
  line-height: 1.4;
  margin-right: 0.5rem;
}

.post-meta {
  font-size: 20px;
  line-height: 1.4;
  color: rgba(black, 0.5);
  margin-top: 0.7rem;
}
</style>
