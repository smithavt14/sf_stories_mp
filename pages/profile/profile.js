const _auth = require('../../utils/auth.js')
const _display = require('../../utils/display.js')

Page({
  data: {},

  // ----- Display Functions -----
  fetchDisplay: async function () {
    let display = await _display.fetch()
    this.setData({display})
  },

  // ----- Navigation Functions -----

  navigateToHome: function () {
    wx.navigateBack({delta: 2})
  },
  
  // ----- Auth Functions -----
  userInfoHandler: async function (data) {
    await _auth.login(data).then(user => {
      if (user) {
        wx.setStorageSync('user', user)
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
  }
})