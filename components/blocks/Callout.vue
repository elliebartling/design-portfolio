<template>
  <div class="callout mono column is-7">
    <div :class="`wrap bg-${background}`">
      <div class="icon">
        {{ icon }}
      </div>
      <div v-html="text"></div>
    </div>
  </div>
</template>

<script>
import cheerio from 'cheerio'
// import flattenDeep from 'lodash/flattenDeep'
export default {
  name: 'CalloutBlock',
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
      const $ = cheerio.load('<p></p>')

      if (title) {
        for (let part of title) {
          let text = this.applyFormatting(part)
          $('p').append(text)
        }

        return $.html('p')
      }
    },
    background() {
      return this.block.format ? this.block.format.block_color : 'gray'
    },
    icon() {
      return this.block.format ? this.block.format.page_icon : '💡'
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
.callout {
  margin: 80px auto;
}

.callout .wrap {
  background: rgba(#DCDCDC, .3);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  padding: 30px 30px;
}

.callout .icon {
  font-size: 26px;
  margin-right: 12px;
  margin-top: 4px;
}

.callout p {
  font-size: 16px;
}

.callout p:last-of-type {
  margin-bottom: 0px;
}

.callout p a {
  color: black;
  text-decoration: underline;
}
</style>
