const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')
const _display = require('../../utils/display.js')
const _favorite = require('../../utils/favorite.js')

Page({
  data: {
    displayMenu: false,
    displayInfo: true,
    displayFontContainer: false,
    titleAnimation: {},
    headerAnimation: {}
    // (1)
  }, 

  // ----- Display Functions -----

  fetchDisplay: async function () {
    let display = await _display.fetch() // (2)
    this.setData({ display })
  },

  toggleMode: function (e) {
    let display = this.data.display;
    display = _display.toggleMode(display);
    this.setData({ display });
  },

  changeFontSize: function (event) {
    let display = this.data.display
    let value = event.detail.value
    
    display.fontSize = value
    display = _display.update(display)
    
    this.setData({display})
  },

  toggleMenu: function () {
    let displayMenu = !this.data.displayMenu
    this.setData({ displayMenu })
  },

  changeFont: function (e) {
    let display = this.data.display
    let fonts = ["'Georgia', 'Times New Roman', 'Times', 'serif'", "'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'", "'Courier New', 'Courier', monospace"]
    let active = parseInt(e.currentTarget.dataset.font)
    let name = fonts[active]

    display.fontFamily = { active, name }
      
    display = _display.update(display)
    this.setData({display})
  },

  onTap: function (e) {
    let displayInfo = !this.data.displayInfo
    this.titleAnimation()
    this.setData({ displayInfo })
  },

  toggleFontContainer: function () {
    let displayFontContainer = this.data.displayFontContainer
    displayFontContainer = !displayFontContainer
    this.setData({ displayFontContainer })
  },

  titleAnimation: function () {
    let displayInfo = this.data.displayInfo

    let titleAnimation = wx.createAnimation({ duration: 500, timingFunction: 'ease' });
    let headerAnimation = wx.createAnimation({ duration: 500, timingFunction: 'ease' });
    
    if (displayInfo) {
      titleAnimation.translateY(300).step()
      headerAnimation.translateY(-300).step()
    } else {
      titleAnimation.translateY(0).step()
      headerAnimation.translateY(0).step()
    }

    this.setData({
      titleAnimation: titleAnimation.export(), 
      headerAnimation: headerAnimation.export() 
    })
  },

  // ----- Story Functions -----

  getRandomStory: async function (attrs = {}) {
    wx.showLoading({title: 'Fetching...'})
    
    let user = attrs.user ? attrs.user : this.data.user

    _story.random().then(async story => {
      story = await _story.setReadSpeed(story)
      story['favorite'] = {}

      story.favorite['count'] = await _favorite.fetchCount(story)

      if (user) {
        let favorite = await _favorite.active(user, story) // (3)
        story.favorite['active'] = !!favorite
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
      story['favorite'] = {}

      story.favorite['count'] = await _favorite.fetchCount(story)

      if (user) {
        let favorite = await _favorite.active(user, story) // (3)
        story.favorite['active'] = !!favorite
      }
      
      wx.hideLoading()
      this.setData({ story, displayMenu: false }) // (4)
    })
  },

  // ----- Favorite Functions -----

  addFavorite: async function () {    
    let user = this.data.user
    let story = this.data.story

    if (user && story) {

      await _favorite.add(user, story).then(async res => {

        let count = await _favorite.fetchCount(story)

        if (story.favorite) {
          story.favorite.active = true 
          story.favorite.count = count
        } else {
          story['favorite'] = { active: true, count }
        }
        this.setData({ story })
      })
    } else {
      await _auth.getCurrentUser().then(user => {
        this.setData({user})
        this.addFavorite();
      });
    }
  },

  removeFavorite: async function () {
    let user = this.data.user
    let story = this.data.story

    if (user && story && story.favorite.active) {
      await _favorite.remove(user, story).then(async res => {
        let count = await _favorite.fetchCount(story)

        if (story.favorite) {
          story.favorite.active = false
          story.favorite.count = count
        } else {
          story['favorite'] = { active: false, count }
        }

        this.setData({ story })
      })
    }
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
          this.setData({ user })
          resolve(user)
        } else {
          console.log('No User')
          resolve(undefined)
        }
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