// pages/index/index.js
const WalkEffect = wx.createInnerAudioContext({
  useWebAudioImplement: true
})
const effectUtils = require("../../utils/playEffect");

Page({
  data: {
    checked: false,
    isLoading: false,
    isWalking: false,
    bgBubbleAnimation: {},
    index: 1,
    scale: 1,
    map1_place_1_x: '115rpx',
    map1_place_1_y: '180rpx',
    map1_place_2_x: '370rpx',
    map1_place_2_y: '860rpx',
    map1_place_3_x: '550rpx',
    map1_place_3_y: '770rpx',
    map2_place_1_x: '80rpx',
    map2_place_1_y: '0rpx',
    map2_place_2_x: '340rpx',
    map2_place_2_y: '980rpx',
    map3_place_1_x: '280rpx',
    map3_place_1_y: '220rpx',
    map3_place_2_x: '200rpx',
    map3_place_2_y: '850rpx',
    map4_place_1_x: '180rpx',
    map4_place_1_y: '480rpx',
    map5_place_1_x: '280rpx',
    map5_place_1_y: '460rpx',

    map1_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/map1.jpg?sign=655659b69dc923951dd527e1b276ffc7&t=1709038022',
    map2_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/map2.jpg?sign=01c9e6ef2eb687a4905fdab9220f67a0&t=1709135120',
    map3_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/map3.jpg?sign=0f1ab17c1eed96f1a40159e01bf17b9e&t=1709135243',
    map4_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/map4.jpg?sign=05c0dd1e9a85855e4f386ec1d262a613&t=1709135276',
    map5_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/map5.jpg?sign=10b39b99175e455199cb0549cede2b71&t=1709135287',

    page_bubble_effect_url: 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/page_bubble.mp3?sign=bb512c5681875f6f796df2754b73351c&t=1709213353'
  },
  // 页面加载时候播放音乐
  onShow: function () {
    let bgmManager = wx.getBackgroundAudioManager();
    this.player(bgmManager);
  },
  // 点击按钮暂停音乐
  checkMusic() {
    this.setData({
      checked: !this.data.checked
    })
    let bgmManager = wx.getBackgroundAudioManager();
    if (this.data.checked) {
      bgmManager.pause();
    } else {
      this.player(bgmManager);
    }
  },
  // 播放音乐
  player(bgmManager) {
    bgmManager.title = 'miniprograme_bgm';
    bgmManager.src = "https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/bgm.mp3?sign=757a4d088d1c0d672cb5eada70e50863&t=1709208479";

    bgmManager.volume = 0; // 例如将音量设置为一半大小

    //音乐播放结束后继续播放此音乐，循环不停的播放
    bgmManager.onEnded(() => {
      this.player(bgmManager);
    });
  },
  // 页面卸载时候暂停播放（不加页面将一直播放）
  onUnload() {
    wx.getBackgroundAudioManager().stop();
  },
  // 小程序隐藏时候暂停播放（不加页面将一直播放）
  onHide() {
    wx.getBackgroundAudioManager().stop();
  },
  move: function (event) {
    // 接受点击事件的参数
    var id = event.currentTarget.dataset.id;
    var position = event.currentTarget.dataset.position;
    var color = event.currentTarget.dataset.color;
    let that = this;


    // 创建背景泡泡动画-第一步
    var bgBubbleAnimation = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-out'
    });
    bgBubbleAnimation.bottom('-60rpx').step();

    // 创建背景泡泡动画-第二步
    var bgBubbleAnimation_second_step = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out'
    });
    bgBubbleAnimation_second_step.left(position).step();

    // 创建背景泡泡动画-第三步
    var bgBubbleAnimation_third_step = wx.createAnimation({
      duration: 450,
      timingFunction: 'ease-out'
    });
    bgBubbleAnimation_third_step.bottom('-100rpx').step();

    // 连续执行动画
    var promise = new Promise((resolve, reject) => {
      this.setData({
        bgBubbleAnimation: bgBubbleAnimation.export(),
        // isLoading: true
      });
      setTimeout(resolve, 50); // 等待第一步动画执行完毕
    });

    var bubbleAnimations = [];
    var iconAnimations = [];

    promise.then(() => {
      return new Promise((resolve, reject) => {
        // 创建气泡和图标动画

        for (var i = 1; i <= 4; i++) {
          var bubbleAnimation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease-out'
          });
          bubbleAnimation.translateY('120%').step();
          bubbleAnimations.push(`bubble${i}Animation`);
          that.setData({ [`bubble${i}Animation`]: bubbleAnimation.export() });

          var iconAnimation = wx.createAnimation({
            duration: 50,
            timingFunction: 'ease-out'
          });
          iconAnimation.opacity(0).step();
          iconAnimations.push(`icon${i}Animation`);
          that.setData({ [`icon${i}Animation`]: iconAnimation.export() });
        }
        this.setData({
          bgBubbleAnimation: bgBubbleAnimation_second_step.export(),
        });
        setTimeout(resolve, 100); // 等待第一步动画执行完毕

      });
    }).then(() => {
      this.setData({
        bgBubbleAnimation: bgBubbleAnimation_third_step.export()
      });

      effectUtils.playEffect(this.data.page_bubble_effect_url)

      var clickBubbleAnimation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease-out'
      });
      clickBubbleAnimation.translateY('0%').opacity(1).step();

      var clickBubbleSpanAnimation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease-out'
      });
      clickBubbleSpanAnimation.opacity(0.7).step();
      that.setData({
        [bubbleAnimations[id - 1]]: clickBubbleAnimation.export(),
        [iconAnimations[id - 1]]: clickBubbleSpanAnimation.export()
      });
      // 更新导航栏和背景颜色动画
      var navbarContainerAnimation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      navbarContainerAnimation.backgroundColor(color).step();

      var bgAnimation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      bgAnimation.backgroundColor(color).step();

      var bgBubbleAnimation_final = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      bgBubbleAnimation_final.backgroundColor(color).step();

      this.setData({
        navbarContainerAnimation: navbarContainerAnimation.export(),
        bgAnimation: bgAnimation.export(),
        bgBubbleAnimation: bgBubbleAnimation_final.export(),
        index: id,
        isLoading: true
      });

      setTimeout(() => {
        this.setData({
          isLoading: false,
        })
      }, 450);

    }).catch((err) => {
      console.log(err);
    });



  },
  onChange(e) {
    console.log(e.detail)
  },
  onScale(e) {
    console.log(e.detail)
  },
  onBackToClose(event) {
    const id = event.currentTarget.dataset.id;
    const newX = `map1_place_${id}_x`;
    const newY = `map1_place_${id}_y`;
    this.setData({
      [newX]: this.data[newX], // 重置为初始 x 坐标
      [newY]: this.data[newY]  // 重置为初始 y 坐标
    });
  },
  changeMap() {
    console.log('1')
    this.setData({
      isWalking: true
    })
    this.playWalkAnimation();
  },
  playWalkAnimation() {
    const WalkEffect = wx.createInnerAudioContext();
    WalkEffect.src = 'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/walk.mp3?sign=8baa38e04f18e680c55fbe6cd68c13d9&t=1709209446';
    WalkEffect.play();
    // 监听音效播放结束事件，结束后释放音效对象
    WalkEffect.onEnded(() => {
      WalkEffect.destroy();
      this.setData({
        isWalking: false
      })
    });
  },
})