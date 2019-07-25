<template>
  <div class="quote is-6 is-offset-3" v-html="text"></div>
</template>

<script>
import cheerio from 'cheerio'
import flattenDeep from 'lodash/flattenDeep'
export default {
  name: 'QuoteBlock',
  props: {
    block: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    text() {
      let { title } = this.block.properties || {}
      const $ = cheerio.load('<blockquote><span></span></blockquote>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('blockquote span').append(text)
        }

        return $.html('blockquote')
      }
    }
  },
  methods: {
    applyFormatting(part) {
      if (part.length === 1) return part[0].replace('/\n/g', '<br />')

      let formatArray = part[1]
      let text = part[0]
      text = text.replace('/\n/g', '<br />')

      // Apply formatting arrays to the text
      for (let i = 0; i < formatArray.length; i++) {
        let tag = formatArray[i]
        let tagName = tag[0]
        let attribute = ''

        if (tagName === 'a') {
          attribute = `href="${tag[1]}"`
        }

        text = `<${tagName} ${attribute}>${text}</${tagName}>`
      }

      return text
    }
  }
}
</script>

<style lang="scss">
.quote {
  font-size: 28px;
  line-height: 1.4;
  margin-bottom: 4rem;
  margin-top: 4rem;
  position: relative;
  border-left: 6px solid #FEC3C4;
  blockquote {
    padding-left: 20px;
  }

  span {
    display: inline;
    // background-color: #DCDCDC;
  }
}

// .quote + .text p {
//   color: rgba(black, .5);
//   font-size: 14px;
//   font-family: 'IBM Plex Mono', monospace;
//   position: relative;
//   // left: -30px;
// }
</style>
