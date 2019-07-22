<template>
  <div class="subheader column is-6 is-offset-3" v-html="text"></div>
</template>

<script>
import cheerio from 'cheerio'
export default {
  name: 'SubHeader',
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
      const $ = cheerio.load('<h3></h3>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('h3').append(text)
        }

        return $.html('h3')
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
.subheader h3 {
  font-size: 26px;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  // text-transform: uppercase;
  // font-family: 'IBM Plex Mono', monospace;
}
</style>
