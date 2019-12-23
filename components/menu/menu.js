Component({
  properties: {
    display: {
      type: Object,
    }
  },
  methods: {
    toggleMenu: function() {
      this.triggerEvent('toggleMenu')
    },
    changeDisplay: function() {
      this.triggerEvent('changeDisplay')
    },
    getRandomStory: function() {
      this.triggerEvent('getRandomStory')
    }, 
    changeFontSize: function(event) {
      this.triggerEvent('changeFontSize', event)
    }
  },
})