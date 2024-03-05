const effectUtils = require('../../utils/playEffect.js');
const init = require("../../utils/cloud_init");

Component({
  /**
 * 组件的属性列表
 */
  properties: {
    msg: {
      type: String,
      value: ''
    },
    direction: {
      type: String,
      value: 'left' // 默认是左边，你可以通过设置这个属性来改变气泡的方向
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    status: 'close',
    loading: true,
    detail_inf: [],
    photo_url: [],
    click_effect_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/%E6%B3%A1%E6%B2%AB_Freesound.mp3?sign=87112852f355dbbdaa846b6fdb4a8c07&t=1709206496',
    turn_over_book_effect_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/turn-over-the-book.mp3?sign=a86a70133441faf6df86fba45cacb258&t=1709211203',
    silde_effect_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/slide.mp3?sign=60c22eea0febc4326173bd971a9e0a31&t=1709212316',
    db: null,
    backgroud_image_url: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showDetail() {
      const app = getApp();
      const c1 = app.globalData.c1;
      const db = c1.database()
      this.setData({
        db: db
      })

      const that = this;
      this.setData({
        status: 'detail'
      });

      wx.loadFontFace({
        family: 'deyiFont',
        source: 'url("https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/Smiley_Sans_Oblique_%E6%96%9C%E4%BD%93.ttf?sign=2e97c3f835533203eb85ff1fee591ed1&t=1709014844")',
        success(res) {
          that.getDetail();

          // 在status变为'detail'时播放音效
          if (that.data.status === 'detail') {
            effectUtils.playEffect(that.data.click_effect_url)
          }
        },
        fail: function (res) {
          console.log(res.status);
        },
      });
    },
    getDetail() {
      var msg = this.properties.msg;
      this.data.db.collection('star-place-inf').where({
        name: msg
      }).get().then(res => {
        this.setData({
          detail_inf: res.data,
          photo_url: res.data[0].photo_url,
          backgroud_image_url: res.data[0].backgroud_image_url,
          loading: false
        });
      });
    },
    backToClose() {
      this.triggerEvent('backtoclose', {}, {})
      this.setData({
        status: 'close'
      })
      if (this.data.status === 'close') {
        effectUtils.playEffect(this.data.silde_effect_url)
      }
    },
    showMore() {
      this.setData({
        status: 'more'
      })
      if (this.data.status === 'more') {
        effectUtils.playEffect(this.data.turn_over_book_effect_url)
      }
    },
    viewImage(event) {
      var current = event.currentTarget.dataset.src; // 获取点击图片的路径

      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: this.data.photo_url // 需要预览的图片http链接列表
      })
    },
  },

})