<template>
  <ul class="numbered-list column is-6 is-offset-3" v-html="text"></ul>
</template>

<script>
import cheerio from 'cheerio'

export default {
  name: 'NumberedList',
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
      const $ = cheerio.load('<li></li>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('li').append(text)
        }

        return $.html('li')
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

<style lang="scss" scoped>
.numbered-list {
  font-size: 20px;
  list-style-type: disc;
  padding-left: 40px;
  margin-bottom: 1rem;
}
</style>
