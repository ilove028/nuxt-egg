export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$route.params.lang || 'en'
      }
    }
  }
}
