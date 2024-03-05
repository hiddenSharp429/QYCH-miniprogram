let animation = null;

Component({
  properties: {
    // 控制加载动画的显示与隐藏，默认隐藏
    showLoading: {
      type: Boolean,
      value: false
    }
  },
  data:{
    logo_url:'https://636c-cloud1-0glmim4o153108f5-1308665665.tcb.qcloud.la/logo.png?sign=fbe1eced9952830a93b1b647120f4ff1&t=1709037891',
  },
  methods: {
    startAnimation() {
      animation = wx.createAnimation({
        duration: 2000, // 动画持续时间
        timingFunction: 'ease',
      });

      animation.play();
    },

    stopAnimation() {
      if (animation) {
        animation.pause();
      }
    }
  }
})
