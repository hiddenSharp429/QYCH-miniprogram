// 声明新的 cloud 实例
const c1 = new wx.cloud.Cloud({
  // 资源方 小程序A的 AppID
  resourceAppid: 'wx2ee9585543f03ff3',
  // 资源方 小程序A的 的云开发环境ID
  resourceEnv: 'cloud1-0glmim4o153108f5',
})

function init() {
  if (!wx.cloud) {
    console.error('请使用 2.2.3 或以上的基础库以使用云能力')
  } else {
    wx.cloud.init({
      env: "cloud1-0glmim4o153108f5",
      traceUser: true,
    })
  }
}

module.exports = {
  init: init,
};
