<template>
  <div class="text is-6 is-offset-3" v-html="text"></div>
</template>

<script>
import cheerio from 'cheerio'
// import flattenDeep from 'lodash/flattenDeep'
export default {
  name: 'TextBlock',
  props: {
    block: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: null
    }
  },
  computed: {
    text() {
      let { title } = this.block.properties || {}
      const $ = cheerio.load('<p></p>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('p').append(text)
        }

        return $.html('p')
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
.text p a {
  color: black;
  text-decoration: underline;
}
</style>
