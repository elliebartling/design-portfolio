<template>
  <div class="column is-10 mx-auto image-block">
    <img class="image mx-auto" :src="src" :style="`width: ${width}`" />
    <div v-if="text" class="caption column is-7 mx-auto" v-html="text"></div>
  </div>
</template>

<script>
import join from 'lodash/join'
import cheerio from 'cheerio'
export default {
  name: 'ImageBlock',
  props: {
    block: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    src() {
      const { source } = this.block.properties

      if (source.includes('https')) {
        return source[0]
      } else {
        return join([
          'https://www.notion.so/image/',
          encodeURIComponent(source),
          '?width=1800'
        ], '')
      }
    },
    text() {
      let { caption } = this.block.properties || {}
      const $ = cheerio.load('<p></p>')

      if (caption) {
        for (let part of caption) {
          let text = this.applyFormatting(part)
          $('p').append(text)
        }

        return $.html('p')
      }
    },
    width() {
      const { format } = this.block
      const width = format ? format.block_width : ''

      if (width) {
        return width + "px"
      } else {
        return 'auto'
      }
    }
  },
  methods: {
    applyFormatting(part) {
      if (part.length === 1) return part[0]

      let formatArray = part[1]
      let text = part[0]

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
.image-block {
  margin-top: 2rem;
  margin-bottom: 2rem;

  .caption {
    margin-top: 2rem;
  }

  .caption p {
    // text-align: center;
    font-size: 16px;
    color: rgba(black, .4);
  }
}

.image {
  width: 100%;
}
</style>
