<template>
  <div id="caseStudies" class="container">
    <h3>Highlights ✨</h3>
    <div class="columns is-multiline">
      <CaseStudyTile v-for="post in posts" :post="post" />
    </div>
  </div>
</template>

<script>
import CaseStudyTile from '@/components/CaseStudyTile'
export default {
  name: 'CaseStudies',
  components: { CaseStudyTile },
  computed: {
    posts() {
      return this.$store.state.caseStudies.items
    }
  },
  methods: {
    // getImageSrc(meta) {
    //   if (meta['Featured Image']) {
    //     return require(`@/content/latest/Case Studies/${meta['Featured Image']}`)
    //   } else {
    //     return ''
    //   }
    // }
    getImageSrc(post) {
      if (post.post_meta['C}:h']) {
        return 'https://www.notion.so/image/' + encodeURIComponent(post.post_meta['C}:h'][0][1][0][1]) + '?width=800'
        // notion://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6b7679e6-29f6-43b1-88f7-31ea15327bb2%2Fmockup-atthefork-featured.jpg?table=block&id=deb13e6a-1416-41f9-9862-bc331b7e4905&width=600&cache=v2
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#caseStudies {
  padding-bottom: 5rem;
  h3 {
    margin-bottom: 2rem;
  }
}
</style>
