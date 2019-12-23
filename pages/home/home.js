const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')
const _display = require('../../utils/display.js')
const _favorite = require('../../utils/favorite.js')

Page({
  data: {
    displayMenu: false,
    displayInfo: true
  },

  // ----- Display Functions -----

  fetchDisplay: async function () {
    let display = await _display.fetch()
    
    this.setData({ display })
  },

  toggleMode: async function (e) {
    let display = this.data.display
    display = await _display.toggleMode(display)
    
    this.setData({ display })
  },

  changeFontSize: async function (event) {
    let display = this.data.display
    let value = event.detail.detail.value
    
    display.fontSize = value
    display = await _display.update(display)
    
    this.setData({display})
  },

  toggleMenu: function () {
    let displayMenu = !this.data.displayMenu
    this.setData({ displayMenu })
  },

  onTap: function (e) {
    let displayInfo = !this.data.displayInfo
    this.setData({ displayInfo })
  },

  // ----- Story Functions -----

  getRandomStory: async function () {
    wx.showLoading({title: 'Fetching...'})

    let user = await this.getCurrentUser()
    
    _story.random().then(async story => {

      story = await _story.setReadSpeed(story)
      if (user) {
        let favorite = await _favorite.query(user, story)

        if (favorite) {
          story['isFavorite'] = story.id === favorite.story.id
        }
      } else story['isFavorite'] = false
      
      wx.hideLoading()
      this.setData({ story, displayMenu: false })
    })
  },

  // ----- Favorite Functions -----

  addFavorite: async function () {    
    wx.showLoading({ title: 'Adding...' })

    let user = this.data.user
    let story = this.data.story
    
    await _favorite.add(user, story).then(async res => {
      user['favorites'] = await _favorite.fetch(user)
      let favorite = await _favorite.query(user, story)

      if (favorite) {
        story['isFavorite'] = story.id === favorite.story.id
      }

      wx.hideLoading()
      this.setData({ story, user })
    })
  },

  removeFavorite: async function () {
    wx.showLoading({title: 'Removing...'})

    let user = this.data.user
    let story = this.data.story

    let favorite = await _favorite.query(user, story)

    await _favorite.remove(favorite).then(async res => {
      user['favorites'] = await _favorite.fetch(user)
      let favorite = await _favorite.query(user, story)

      story['isFavorite'] = !!favorite
      
      wx.hideLoading()
      this.setData({ story, user })
    })
  },

  fetchFavorites: async function () {
    let user = this.data.user
    await _favorite.fetch(user).then(favorites => {
      user['favorites'] = favorites
      this.setData({user})
    })
  },

  queryFavorites: async function () {

  },

  // ----- Navigation Functions -----

  navigateToProfile: function () {
    wx.navigateTo({
      url: '/pages/profile/profile',
      success: () => this.setData({ displayMenu: false }),
      fail: err => console.log('navigation error -->', err)
    })
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

  // ----- LifeCycle Functions -----
  
  onLoad: function () {
    this.getRandomStory()
    this.fetchDisplay()
  }
})