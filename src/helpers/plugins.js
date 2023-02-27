const plugIns = {
    install(app, options) {
      app.config.globalProperties.$is_online = () => {
        return window.navigator.onLine
      }
    }
  }

export default plugIns