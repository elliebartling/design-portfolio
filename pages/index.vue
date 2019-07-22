<template>
  <div id="home" class="container is-fluid">
    <section id="hero" class="container">
      <div class="columns">
        <div class="column is-7 is-offset-2" v-html="body"></div>
      </div>
    </section>
    <CaseStudies />
    <!-- <Thoughts /> -->
  </div>
</template>

<script>
import CaseStudies from '~/components/CaseStudies.vue'
import VRuntimeTemplate from 'v-runtime-template'
import cheerio from 'cheerio'

export default {
  name: 'Home',
  components: {
    CaseStudies,
    VRuntimeTemplate
  },
  computed: {
    page() {
      return this.$store.getters.getPostByTitle('pages', 'Home')
    },
    body() {
      const $ = cheerio.load(this.page.body)

      // On this page, all code blocks are Vue Components
      $('p code').each((i, block) => {
        let contents = $(block).contents()
        console.log(contents)
        $(block).parent().replaceWith(contents)
      })

      return $('.page-body').html()
    }
  }
}
</script>

<style lang="scss">
body, html {
  background: #FFF;
}

#home {
  margin-top: 40px;
  margin-bottom: 40px;
  background: white;
}

section#hero {
  padding-top: 10rem;
  padding-bottom: 6rem;
}

#home h1 {
  font-size: 3.5rem; // 36px
  line-height: 1.1;
}

#home h1 + p {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  margin-top: 1rem;
  line-height: 1.4;
  margin-bottom: 4rem;
}
</style>
