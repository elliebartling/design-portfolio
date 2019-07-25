<template>
  <div id="footer">

  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    page() {
      return this.$store.getters.getPostBySlug('pages', 'footer')
    }
  }
}
</script>

<style scoped>

</style>
