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

  // ----- Favorite Functions -----

  fetchAllFavorites: async function (user) {
    return new Promise(async resolve => {
      await _favorite.fetchAll(user).then(async favorites => {
        await this.formatDate(favorites)
        this.setData({ user, favorites })
        resolve(user)
      })
    })
  },

  formatDate: function (favorites) {
    return new Promise(resolve => {
      let sorted_favorites = favorites.sort((a, b) => {return b.created_at - a.created_at})
      
      sorted_favorites.forEach(favorite => {
        let options = {year: 'numeric', month: 'long', day: 'numeric' }
        let date = new Date(favorite.created_at * 1000)
        favorite['created_at'] = date.toLocaleDateString('en-US', options)
      })
      resolve(sorted_favorites)
    })
  },

  // ----- Auth Functions -----
  getCurrentUser: function () {
    return new Promise(async resolve => {
      await _auth.getCurrentUser().then(async user => {
        if (user) resolve(user)
        else resolve(undefined)
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
      if (user) this.fetchAllFavorites(user)
    })
  }
})