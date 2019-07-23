<template>
  <div id="home" class="container is-fluid">
    <section id="hero" class="container">
      <component
        v-for="(block, index) in blocks"
        class="home-block component-block mx-auto"
        :is="getBlockType(block)"
        :block="block"
        :key="index"
      ></component>
    </section>
    <!-- <CaseStudies /> -->
    <!-- <Thoughts /> -->
  </div>
</template>

<script>
import CaseStudies from '~/components/CaseStudies.vue'
import cheerio from 'cheerio'
import camelCase from 'lodash/camelCase'
import Brief from '@/components/Brief'
import MoreHighlights from '@/components/MoreHighlights'
import TextBlock from '@/components/blocks/Text'
import ImageBlock from '@/components/blocks/Image'
import SubHeaderBlock from '@/components/blocks/SubHeader'
import SubSubHeaderBlock from '@/components/blocks/SubHeader'
import HeaderBlock from '@/components/blocks/Header'
import QuoteBlock from '@/components/blocks/Quote'
import NumberedListBlock from '@/components/blocks/NumberedList'
import CalloutBlock from '@/components/blocks/Callout'
import InvisionBlock from '@/components/blocks/Invision'
import VideoBlock from '@/components/blocks/Video'
import ColumnListBlock from '@/components/blocks/ColumnList'


export default {
  name: 'Home',
  components: {
    CaseStudies,
    TextBlock,
    ImageBlock,
    SubHeaderBlock,
    SubSubHeaderBlock,
    HeaderBlock,
    QuoteBlock,
    NumberedListBlock,
    CalloutBlock,
    InvisionBlock,
    VideoBlock,
    ColumnListBlock
  },
  computed: {
    page() {
      return this.$store.getters.getPostByTitle('pages', 'Home')
    },
    blocks() {
      return this.page.blocks
    }
  },
  methods: {
    getBlockType(block) {
      if (block) {
        return camelCase(block.type + 'Block')
      }
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
  padding-top: 6rem;
  padding-bottom: 6rem;
}

#home h1 {
  font-size: 3.5rem; // 36px
  line-height: 1.1;
}

#home .home-block {
  width: 60%;
  margin-left: 20%;
  h2 {
    font-size: 48px;
    margin-bottom: 0rem;
  }
}

#home .home-block.text.component-block {
  width: 55%;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  margin-top: 0rem;
  line-height: 1.6;
  margin-bottom: 4rem;
}
</style>
