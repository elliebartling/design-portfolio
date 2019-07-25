<template>
  <div class="pdf-block column is-7 mx-auto">
    <iframe :style="`height: ${height}px`" :src="src" />
  </div>
</template>

<script>
import join from 'lodash/join'
export default {
  name: 'PdfBlock',
  props: {
    block: {
      type: Object,
      default() {
        return {}
      }
    },
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
    height() {
      return this.block.format ? this.block.format.block_height : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.invision-block {
  margin-top: 4rem;
}

iframe {
  width: 100%;
  height: auto;
}
</style>
