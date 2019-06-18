<template>
  <div>
    <common-header />
    <nuxt />
  </div>
</template>
<script>
import commonHeader from '~/components/header.vue'
import header from '../plugins/mx/mixins/header.js'

export default {
  components: { commonHeader },
  mixins: [header]
}
</script>
