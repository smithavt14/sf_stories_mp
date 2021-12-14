App({

  loadFont: function () {
    wx.loadFontFace({
        family: 'Gugi',
        source: 'url("https://cloud-minapp-32145.cloud.ifanrusercontent.com/1mwugC6330dMZ2wj.ttf")',
        success: res => console.log(res)
    })
    wx.loadFontFace({
      family: 'Merriweather',
      source: 'url("https://cloud-minapp-32145.cloud.ifanrusercontent.com/1mwugKh6MRkQXRz6.ttf")',
      success: res => console.log(res)
    })
    wx.loadFontFace({
      family: 'Montserrat',
      source: 'url("https://cloud-minapp-32145.cloud.ifanrusercontent.com/1mwugSJIbIuSUEiT.ttf")',
      success: res => console.log(res)
    })
  },

  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin');
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo);
    wx.BaaS.init('cb9a7ac119a30fa980be');
  }
})