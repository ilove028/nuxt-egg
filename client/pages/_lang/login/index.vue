<template>
  <div class="login">
    <el-date-picker
      v-model="date"
      type="date"
      :placeholder="$t('login.select')"
    >
    </el-date-picker>
    <form name="login" autocomplete="off">
      <input v-model="account" type="text" />
      <!-- <input v-model="password" type="password" /> -->
      <password v-model="password" />
      <button type="submit" @click.prevent="handleLogin">
        {{ $t('login.login') }}
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date(),
      account: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      return this.$axios
        .post('/user/query', {
          account: this.account,
          password: this.password
        })
        .then(({ data }) => {
          // document.cookie = `token=${token}`
          this.$store.commit('setUser', data)
          this.$router.push({ path: this.$i18n.path('') })
        })
    }
  }
}
</script>
