<template>
  <header class="header">
    <ul>
      <li>
        <nuxt-link :to="$i18n.path('')">{{ $t('header.home') }}</nuxt-link>
      </li>
      <li>{{ $t('header.users') }}</li>
      <li>{{ $t('header.vehicle') }}</li>
      <li>{{ $t('header.content') }}</li>
      <li>
        <nuxt-link :to="$i18n.path('login')" :exact="false">
          {{ $t('header.login') }}
        </nuxt-link>
      </li>
      <auth :has-permissions="permissions" :need-permissions="['admin']">
        <li>{{ $t('header.admin') }}</li>
      </auth>
    </ul>
  </header>
</template>
<script>
export default {
  data() {
    return {
      permissions: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.permissions.push('admin')
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variable.scss';
.header {
  font-size: $larger-font-size;
}
</style>
