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
        <component
          v-for="(block, index) in blocks"
          class="component-block"
          :is="getBlockType(block)"
          :block="block"
          :key="index"
        ></component>
      </article>
    </div>
  </div>
</template>

<script>
// import cheerio from 'cheerio'
import camelCase from 'lodash/camelCase'
import Brief from '@/components/Brief'

import TextBlock from '@/components/blocks/Text'
import ImageBlock from '@/components/blocks/Image'
import SubHeaderBlock from '@/components/blocks/SubHeader'
import SubSubHeaderBlock from '@/components/blocks/SubHeader'
import HeaderBlock from '@/components/blocks/Header'
import QuoteBlock from '@/components/blocks/Quote'
import NumberedListBlock from '@/components/blocks/NumberedList'
import CalloutBlock from '@/components/blocks/Callout'
import InvisionBlock from '@/components/blocks/Invision'


export default {
  name: 'Work',
  components: {
    Brief,
    TextBlock,
    ImageBlock,
    SubHeaderBlock,
    SubSubHeaderBlock,
    HeaderBlock,
    QuoteBlock,
    NumberedListBlock,
    CalloutBlock,
    InvisionBlock
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
    featuredImage() {
      if (this.post.post_meta['C}:h']) {
        return 'https://www.notion.so/image/' + encodeURIComponent(
          this.post.post_meta['C}:h'][0][1][0][1]) + '?width=1800'
      } else {
        return ''
      }
    },
    body() {
      // const $ = cheerio.load(this.page.body, {
      //   withDomLvl1: false,
      //   decodeEntities: false
      // })
      //
      // $('article p').first().addClass('lede')
      //
      // $('p code').each((i, block) => {
      //   let contents = $(block).text()
      //   if (contents.includes('Brief')) {
      //     $(block).parent().replaceWith('<p class="brief"></p>')
      //   }
      // })
      //
      // const brief = $('article p.brief').nextUntil('article p.brief')
      //
      // brief.each((i, block) => {
      //   console.log($(block).text())
      //   $(block).addClass('red')
      // })
      //
      // return $.html('article .page-body')

      // return {
      //   template: '<div>' + $('article').html() + '</div>',
      //   components: { Brief }
      // }
    },
    header() {
      // const $ = cheerio.load(this.page.body, {
      //   withDomLvl1: false,
      //   decodeEntities: false
      // })
      //
      // return $.html('article header')
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

article .text:first-of-type p {
  font-size: 28px;
  line-height: 1.3;
  margin-bottom: 3rem;
  font-weight: 400;
  color: rgba(black, .7);
}

.red {
  color: red;
}

.featured-image {
  width: 100%;
}
</style>
