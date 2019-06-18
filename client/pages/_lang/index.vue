<template>
  <div class="home">
    <h1>{{ $t('header.home') }}</h1>
    <h2>{{ ip }}</h2>
    <button @click="increase">{{ count }}</button>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 }
  },
  asyncData({ $axios }) {
    return $axios.$get('http://icanhazip.com').then(ip => ({ ip }))
  },
  mounted() {
    this.getTopics()
  },
  methods: {
    increase() {
      this.count += 1
    },
    getTopics() {
      return this.$axios.$get('/api/v1/topics', {
        page: 1,
        tab: 'good',
        limit: 20,
        mdrender: false
      })
    }
  }
}
</script>
