<template>
  <div class="column is-10 mx-auto image-block">
    <img class="image" :src="src" />
  </div>
</template>

<script>
import join from 'lodash/join'
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
    }
  }
}
</script>

<style lang="scss">
.image-block {
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.image {
  width: 100%;
}
</style>
