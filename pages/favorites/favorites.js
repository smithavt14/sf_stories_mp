const _auth = require('../../utils/auth.js')
const _display = require('../../utils/display.js')
const _story = require('../../utils/story.js')
const _favorite = require('../../utils/favorite.js')

Page({
  data: {},

  // ----- Story Functions -----
  getAllStories: async function (user) {
    wx.showLoading({title: 'Fetching...'})
    let stories = await _story.queryAll(user)
    
    wx.hideLoading()
    this.setData({ stories })
  },

  // ----- Auth Functions -----
  getCurrentUser: function () {
    return new Promise(async resolve => {
      await _auth.getCurrentUser().then(async user => {
        if (user) {
          await _favorite.fetch(user).then(favorites => {
            user['favorites'] = favorites
            this.setData({ user })
            resolve(user)
          })
        } else resolve(undefined)
      })
    })
  },

  // ----- Display Functions -----
  fetchDisplay: async function () {
    let display = await _display.fetch()
    
    this.setData({ display })
  },

  // ----- Navigation Functions -----
  navigateToStory: function (e) {
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: `/pages/home/home?id=${id}`
    })
  },

  navigateBack: function () {
    wx.navigateBack({})
  },
  
  // ----- Lifecycle Functions -----
  onShow: function () {
    this.fetchDisplay()
    this.getCurrentUser().then((user) => {
      if (user) this.getAllStories(user)
    })
  }
})