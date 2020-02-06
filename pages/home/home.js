const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')
const _display = require('../../utils/display.js')
const _favorite = require('../../utils/favorite.js')

Page({
  data: {
    displayMenu: false,
    displayInfo: true
    // (1)
  }, 

  // ----- Display Functions -----

  fetchDisplay: async function () {
    let display = await _display.fetch() // (2)
    
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

  getRandomStory: async function (attrs = {}) {
    wx.showLoading({title: 'Fetching...'})
    
    let user = attrs.user ? attrs.user : this.data.user

    _story.random().then(async story => {

      story = await _story.setReadSpeed(story)

      if (user) {
        let favorite = await _favorite.query(user, story) // (3)
        story['isFavorite'] = !!favorite
      } 
      
      wx.hideLoading()
      this.setData({ story, displayMenu: false }) // (4)
    })
  },

  fetchStoryWithId: async function (id) {
    wx.showLoading({title: 'Fetching...'})

    let user = this.data.user
    
    _story.fetchWithId(id).then(async story => {
      story = await _story.setReadSpeed(story)

      if (user) {
        let favorite = await _favorite.query(user, story) // (3)
        story['isFavorite'] = !!favorite
      } 
      
      wx.hideLoading()
      this.setData({ story, displayMenu: false }) // (4)
    })
  },

  // ----- Favorite Functions -----

  addFavorite: async function () {    
    wx.showLoading({ title: 'Adding...' })

    let user = this.data.user
    let story = this.data.story

    if (user && story) {
      await _favorite.add(user, story).then(async res => {
        story = await _story.varyFavorites(story, 'add') // (10)

        user['favorites'] = await _favorite.fetch(user) // (5)
        
        let favorite = await _favorite.query(user, story) // (6)
        story['isFavorite'] = !!favorite // (7)
        
        wx.hideLoading()
        this.setData({ story, user })
      })
    } else {
      wx.showToast({title: 'Please Login'})
    }
  },

  removeFavorite: async function () {
    wx.showLoading({title: 'Removing...'})

    let user = this.data.user
    let story = this.data.story

    let favorite = await _favorite.query(user, story)

    if (user && story && favorite) {
      await _favorite.remove(favorite).then(async res => {
        story = await _story.varyFavorites(story, 'subtract') // (10)

        user['favorites'] = await _favorite.fetch(user) // (5)
        
        let favorite = await _favorite.query(user, story) // (6)
        
        story['isFavorite'] = !!favorite // (7)
        
        wx.hideLoading()
        this.setData({ story, user })
      })
    }
  },

  fetchFavorites: async function () {
    let user = this.data.user
    
    await _favorite.fetch(user).then(favorites => {
      user['favorites'] = favorites // (8)
      this.setData({user})
    })
  },

  // ----- Navigation Functions -----

  navigateToProfile: function () {
    wx.navigateTo({
      url: '/pages/profile/profile',
      success: () => this.setData({ displayMenu: false }), // (9)
      events: {
        receiveStoryId: function (id) {
          console.log('Return to Home --> ', id)
        }
      }, 
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
  
  onLoad: async function (options) {
    this.fetchDisplay()

    if (options.id) {
      let id = options.id

      await this.getCurrentUser().then(user => {
        this.fetchStoryWithId(id)
      })
    } else {
      let story = this.data.story
      
      await this.getCurrentUser().then(user => {
        if (!story) this.getRandomStory({user})
      })
    }
  },

  onShow: function () {
    this.getCurrentUser()
  },

  onShareAppMessage: function (res) {
    let story = this.data.story

    return {
      title: `${story.title}`,
      path: `/pages/home/home?id=${story.id}`
    }
  }
})

/* ----- Notes -----
1. Data should have the following objects: user, story, display

2. If no 'mode' is found in storage, default is 'lightMode'

3. If the user is present, determine whether or not current story is included in the user's favorites

4. Menu is default 'hidden' whenever a new story is fetched

5. Returns an array of 'Favorite' objects which include both story and user IDs  

6. If user.favorites includes current story ID, return the related favorite object

7. Sets isFavorite to a boolean 

8. Returns an array of Favorite objects

9. On return from pages/profile/profile, hide menu

10. Increase the num_favorites for the selected story

*/