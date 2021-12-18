const _auth = require('../../utils/auth.js')
const _display = require('../../utils/display.js')

Page({
  data: {
    animation: {
      block1: {},
      block2: {},
      block3: {}
    }
  },

  // ----- Display Functions -----
  fetchDisplay: async function () {
    let display = await _display.fetch()
    this.setData({display})
  },

  slideInAnimate: function () {
    let animation = []
    let delay = 0
    
    for (let i = 0; i <= 4; i++) {
      animation[i] = wx.createAnimation({ delay, duration: 1000, timingFunction: 'ease' })
      animation[i].translateY(0).step()
      delay += 250
    } 

    this.setData({ animation })
  },

  // ----- Navigation Functions -----

  navigateToHome: function () {
    wx.redirectTo({
      url: '/pages/home/home'
    })
  },

  navigateToCommunity: function () {

    wx.navigateTo({
      url: '/pages/community/community',
      success: (res) => console.log(res),
      fail: (err) => console.log(err)
    })
  },

  navigateBack: function () {
    wx.navigateBack({
      delta: 10,
    })
  },

  navigateToFavorites: function () {
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    })
  },

  navigateToPopular: function () {
    wx.navigateTo({
      url: '/pages/popular/popular'
    })
  },
  
  // ----- Auth Functions -----
  userInfoHandler: async function (data) {
    wx.showLoading({ title: 'Logging in...' })
    await _auth.login(data).then(user => {
      if (user) {
        wx.setStorageSync('user', user)
        
        wx.hideLoading()
        this.setData({ user })
      }
    })
  },

  getCurrentUser: async function () {
    await _auth.getCurrentUser().then(user => {
      if (user) {
        wx.setStorageSync('user', user)
        this.setData({ user })
      }
    })
  },

  logout: function () {
    _auth.logout()
    this.setData({user: null})
  },

  // ----- Lifecycle Functions -----
  onLoad: function () {
    this.getCurrentUser()
    this.fetchDisplay()
  },

  onShow: function () {
    setTimeout(() => { this.slideInAnimate() }, 50)
  }
})