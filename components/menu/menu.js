const _favorite = require('../../utils/favorite.js')

Component({
  properties: {
    display: {
      type: Object,
    }, 
    story: {
      type: Object
    },
    user: {
      type: Object
    }
  },

  methods: {

    // ----- Trigger Functions ----- 
    removeFavorite: function () {
      this.triggerEvent('removeFavorite')
    },
    addFavorite: async function () {
      this.triggerEvent('addFavorite')
    },
    toggleMenu: function() {
      this.triggerEvent('toggleMenu')
    },
    toggleMode: function() {
      this.triggerEvent('toggleMode')
    },
    getRandomStory: function() {
      this.triggerEvent('getRandomStory')
    }, 
    changeFontSize: function(event) {
      this.triggerEvent('changeFontSize', event)
    },
    navigateToProfile: function () {
      this.triggerEvent('navigateToProfile')
    },
    toggleLike: function () {
      this.triggerEvent('toggleLike')
    }
  }
})