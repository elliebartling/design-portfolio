<template>
  <div class="header is-6 is-offset-3" v-html="text"></div>
</template>

<script>
import cheerio from 'cheerio'
export default {
  name: 'Header',
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
      const $ = cheerio.load('<h2></h2>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('h2').append(text)
        }

        return $.html('h2')
      }
    }
  },
  methods: {
    applyFormatting(part) {
      let text = part[0].replace(/\n/g, '<br />')
      if (part.length === 1) return text

      let formatArray = part[1]


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
.header h2 {
  font-size: 38px;
  line-height: 1.1;
  margin-bottom: 1rem;
  margin-top: 8rem;
}
</style>
