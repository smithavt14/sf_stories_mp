App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo)
    wx.BaaS.init('cb9a7ac119a30fa980be', { autoLogin: true })
  }
})