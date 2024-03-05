// 声明新的 cloud 实例
const c1 = new wx.cloud.Cloud({
  // 资源方 小程序A的 AppID
  resourceAppid: 'wx2ee9585543f03ff3',
  // 资源方 小程序A的 的云开发环境ID
  resourceEnv: 'cloud1-0glmim4o153108f5',
})

// app.js
App({
  // 将 c1 实例挂载到 App 实例上
  globalData: {
    c1: c1,
  },

  async onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "cloud1-0glmim4o153108f5",
        traceUser: true,
      })
    }

    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log("小程序是否需要更新：" + res.hasUpdate)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      console.log("更新失败")
    })

    // 跨账号调用，必须等待 init 完成
    // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
    await c1.init()
  },
})