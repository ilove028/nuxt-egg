import Vue from 'vue'
import Element from 'element-ui'
import enlocale from 'element-ui/lib/locale/lang/en'
import cnLocale from 'element-ui/lib/locale/lang/zh-CN'

export default ({ store }) => {
  Vue.use(Element, {
    locale: store.state.locale === 'zh-CN' ? cnLocale : enlocale
  })
}
