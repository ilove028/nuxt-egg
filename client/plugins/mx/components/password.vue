<template>
  <input
    type="text"
    :value="displayValue"
    @input="handleInput($event)"
    @compositionend="handleInput($event)"
  />
</template>
<script>
export default {
  name: 'Password',
  inheritAttrs: false,
  props: {
    replacer: {
      type: String,
      default: '*'
    }
  },
  computed: {
    displayValue() {
      if (typeof this.$attrs.value === 'string') {
        return this.replacer.repeat(this.$attrs.value.length)
      } else {
        return ''
      }
    }
  },
  methods: {
    handleInput(event) {
      /* eslint-disable no-console */
      console.info(event)
      let fixValue = ''
      if (/insertText/i.test(event.inputType)) {
        fixValue =
          this.$attrs.value + event.target.value.slice(this.$attrs.value.length)
      } else if (/deleteContentBackward/i.test(event.inputType)) {
        fixValue = this.$attrs.value.slice(0, event.target.value.length)
      } else if (/insertFromPaste/i.test(event.inputType)) {
        // 统一处理为粘贴的值
        fixValue = event.target.value
      } else if (/compositionend/.test(event.type)) {
        fixValue =
          this.$attrs.value + event.target.value.slice(this.$attrs.value.length)
      } else if (/insertCompositionText/i.test(event.inputType)) {
        fixValue = this.$attrs.value
      } else if (this.$attrs.value.length > event.target.value.length) {
        fixValue = this.$attrs.value.slice(0, event.target.value.length)
      } else {
        fixValue =
          this.$attrs.value + event.target.value.slice(this.$attrs.value.length)
      }
      this.$emit('input', fixValue)
    }
  }
}
</script>
