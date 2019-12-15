const _auth = require('../../utils/auth.js')

Page({
  data: {},

  // ----- Custom Functions -----
  login: async function () {
    await _auth.login().then(user => {
      if (user) this.setData({user})
    })
  },

  getCurrentUser: async function () {
    await _auth.getCurrentUser().then(user => {
      if (user) this.setData({user})
    })
  },

  logout: function () {
    _auth.logout()
    this.setData({user: null})
  },

  // ----- Lifecycle Functions -----
  onLoad: function () {
    this.getCurrentUser()
  },

  onShow: function () {}
})