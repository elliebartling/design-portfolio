<template>
  <div class="invision-block column is-7 mx-auto">
    <iframe :style="`height: ${height}px`" :src="src" />
  </div>
</template>

<script>
export default {
  name: 'InvisionBlock',
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
      return this.block.properties ? this.block.properties.source[0] : ''
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
