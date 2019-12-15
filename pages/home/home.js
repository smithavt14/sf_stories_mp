const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')

Page({
  data: {
    display: {
      mode: 'light',
      backgroundColor: '#FFFCFC',
      color: '#232323', 
      btn: 'Dark Mode'
    }
  },

  getRandomStory: async function () {
    _story.random().then(story => {
      this.setData({story})
    })
  },

  changeDisplay: function () {
    let display = this.data.display

    let darkMode = { 
      mode: 'dark',
      backgroundColor: '#232323', 
      color: '#D3D3D3', 
      btn: 'Light Mode'
    }

    let lightMode = {
      mode: 'light',
      backgroundColor: '#FFFCFC',
      color: '#232323', 
      btn: 'Dark Mode'
    }

    display = display.mode === 'light' ? darkMode : lightMode

    this.setData({display})
  },
  
  onLoad: function () {
    this.getRandomStory()
  },
  
  onShow: function () {}
})