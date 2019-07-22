<template>
  <!-- <div class="video-block column is-10 mx-auto">
    <vue-plyr>
      <video :src="src" type="video/mp4"></video>
    </vue-plyr>
  </div> -->
</template>

<script>
import join from 'lodash/join'
export default {
  name: 'VideoBlock',
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
          'https://www.notion.so/video/',
          encodeURIComponent(source),
          '?width=1800'
        ], '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-block {
  margin-top: 8rem;
  margin-bottom: 8rem;
}
</style>
