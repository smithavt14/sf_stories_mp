const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')

Page({
  data: {
    display: {
      mode: 'light',
      backgroundColor: '#FFFCFC',
      color: '#232323', 
      btn: 'Dark Mode',
      fontSize: 32
    },
    displayMenu: false,
    displayInfo: true
  },

  // ----- Display Functions -----

  changeDisplay: function () {
    let display = this.data.display
    let fontSize = display.fontSize

    let darkMode = {
      mode: 'dark',
      backgroundColor: '#232323',
      color: '#FFFCFC',
      btn: 'Light Mode',
      fontSize
    }

    let lightMode = {
      mode: 'light',
      backgroundColor: '#FFFCFC',
      color: '#232323',
      btn: 'Dark Mode',
      fontSize
    }

    display = display.mode === 'light' ? darkMode : lightMode

    this.setData({ display })
  },

  changeFontSize: function (event) {
    let value = event.detail.detail.value
    this.setData({ 'display.fontSize': value })
  },

  toggleMenu: function () {
    let displayMenu = this.data.displayMenu
    displayMenu = !displayMenu
    this.setData({ displayMenu })
  },

  // ----- Story Functions -----

  getRandomStory: async function () {
    wx.showLoading({title: 'Fetching...'})
    _story.random().then(async story => {
      story = await _story.setReadSpeed(story)
      this.setData({story, displayMenu: false})
      wx.hideLoading()
    })
  },

  onTap: function (e) {
    let displayInfo = this.data.displayInfo
    displayInfo = !displayInfo
    this.setData({displayInfo})
  },

  // ----- LifeCycle Functions -----
  
  onLoad: function () {
    this.getRandomStory()
  }
})