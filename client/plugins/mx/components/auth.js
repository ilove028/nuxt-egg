export default {
  name: 'auth',
  abstract: true,
  props: {
    needPermissions: {
      type: Array,
      default() {
        return []
      }
    },
    hasPermissions: {
      type: Array,
      default() {
        return []
      }
    },
    has: {
      type: Function,
      default: function(needPermissions, hasPermissions) {
        let has = true
        for (let i = 0; i < needPermissions.length; i++) {
          if (
            !Array.isArray(hasPermissions) ||
            !hasPermissions.some(p => p === needPermissions[i])
          ) {
            has = false
          }
        }
        return has
      }
    }
  },
  render(h) {
    const children = this.$slots.default
    if (children && this.has(this.needPermissions, this.hasPermissions)) {
      return children[0]
    }
  }
}
