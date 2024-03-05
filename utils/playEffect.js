function playEffect(src, volume = 1) {
    const effectContext = wx.createInnerAudioContext();
    effectContext.src = src;
    effectContext.volume = volume;
  
    effectContext.play();
  
    // 监听音效播放结束事件，结束后释放音效对象
    effectContext.onEnded(() => {
        effectContext.destroy();
    });
  }
  
  module.exports = {
    playEffect: playEffect,
  };
  