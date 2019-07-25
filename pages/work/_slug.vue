<template>
  <div :id="slug" class="is-fluid">
    <div class="body">
      <header>
        <img class="featured-image" :src="featuredImage" />
        <div class="column is-6 is-offset-3">
          <router-link to="/" class="back-link">← back</router-link>
          <h1 class="page-title">{{ post.title }}</h1>
        </div>
      </header>
      <article>
        <div v-if="tldr" class="tldr-block column is-6 is-offset-3">
          <span class="tldr">tl;dr:</span>
        </div>
        <component
          v-for="(block, index) in blocks"
          class="component-block"
          :is="getBlockType(block)"
          :block="block"
          :index="index"
          :key="index"
        ></component>
      </article>
      <footer class="article-footer">
        <MoreHighlights />
      </footer>
    </div>
  </div>
</template>

<script>
// import cheerio from 'cheerio'
import camelCase from 'lodash/camelCase'
import Brief from '@/components/Brief'
import CaseStudies from '@/components/CaseStudies'
import MoreHighlights from '@/components/MoreHighlights'

import TextBlock from '@/components/blocks/Text'
import ImageBlock from '@/components/blocks/Image'
import SubHeaderBlock from '@/components/blocks/SubHeader'
import SubSubHeaderBlock from '@/components/blocks/SubHeader'
import HeaderBlock from '@/components/blocks/Header'
import QuoteBlock from '@/components/blocks/Quote'
import NumberedListBlock from '@/components/blocks/NumberedList'
import BulletedListBlock from '@/components/blocks/BulletedList'
import CalloutBlock from '@/components/blocks/Callout'
import InvisionBlock from '@/components/blocks/Invision'
import VideoBlock from '@/components/blocks/Video'
import ColumnListBlock from '@/components/blocks/ColumnList'
import PdfBlock from '@/components/blocks/Pdf'


export default {
  name: 'Work',
  components: {
    CaseStudies,
    MoreHighlights,
    Brief,
    TextBlock,
    ImageBlock,
    SubHeaderBlock,
    SubSubHeaderBlock,
    HeaderBlock,
    QuoteBlock,
    NumberedListBlock,
    BulletedListBlock,
    CalloutBlock,
    InvisionBlock,
    VideoBlock,
    ColumnListBlock,
    PdfBlock
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    post() {
      let slug = this.$route.params.slug
      return this.$store.getters.getPostBySlug('caseStudyPosts', slug)
    },
    blocks() {
      return this.post.blocks
    },
    tldr() {
      return this.blocks[0].type === 'text'
    },
    featuredImage() {
      if (this.post.post_meta['C}:h']) {
        return 'https://www.notion.so/image/' + encodeURIComponent(
          this.post.post_meta['C}:h'][0][1][0][1]) + '?width=1800'
      } else {
        return ''
      }
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
.container {
  margin-top: 40px;
  background: white;
  padding: 10px;
}

.column {
  padding-top: 0px;
  padding-bottom: 0px;
}


.back-link {
  font-family: 'IBM Plex Mono', monospace;
  color: rgba(black, .5);
  display: block;
  font-size: 12px;
  position: relative;
  left: -18px;
  font-weight: 600;
  margin-top: 4rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

article p {
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 1.2rem;
}

h1.page-title {
  font-size: 48px;
  line-height: 1.15;
  margin-bottom: 1rem;
}

.tldr-block + .text p {
  font-size: 28px;
  line-height: 1.3;
  margin-bottom: 3rem;
  font-weight: 400;
  color: rgba(black, .7);
}

.tldr {
  font-family: 'IBM Plex Mono', monospace;
  // text-transform: uppercase;
  font-weight: 600;
  // color: #52C8EE;
  display: block;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.red {
  color: red;
}

.featured-image {
  width: 100%;
}
</style>
