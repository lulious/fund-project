export const GLOBAL_CONFIG = {
    companyName: '广发基金财经',
    asideMenu: [
        {
          path: '/home/investmentGuidance', 
          name: '投研指挥所', 
          configPages: [
            {
              name: '话题管理', 
              path: '/home/investmentGuidance/TopicList',
              filePath: '@/views/investmentGuidance/TopicList.vue', 
            }
          ]
        }, 
      ]
}

export default function(Vue, options) {
  Vue.GLOBAL_CONFIG = GLOBAL_CONFIG;
  window.GLOBAL_CONFIG = GLOBAL_CONFIG;
  Object.defineProperties(Vue.prototype, {
    GLOBAL_CONFIG: {
      get() {
        return GLOBAL_CONFIG;
      }
    },
    $GLOBAL_CONFIG: {
      get() {
        return GLOBAL_CONFIG;
      }
    },
  })
}
