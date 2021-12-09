const _auth = require('../../utils/auth.js')
const _story = require('../../utils/story.js')
const _display = require('../../utils/display.js')
const _favorite = require('../../utils/favorite.js')

Page({

    data: {
        categories: [
            {display: 'ALIENS', data: 'aliens', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsdKvJ5aj6Nl.jpeg'}, 
            {display: 'BIO TECH', data: 'biotech', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxs2WcWOf2b2i.jpeg'}, 
            {display: 'CLONES', data: 'clones', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsTmXyrI1Ata.jpeg'}, 
            {display: 'APACOLYPSE', data: 'disaster-apacolypse', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxskWYgFH1Tow.jpeg'}, 
            {display: 'NANO TECH', data: 'nanotech', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsZUH2rZmXKI.jpeg'}, 
            {display: 'OTHER WORLDS', data: 'other-worlds-sf', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsRB4O6wwsw0.jpeg'}, 
            {display: 'ROBOTS', data: 'robots-and-computers', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsPNYV4KbDMp.jpeg'}, 
            {display: 'SPACE TRAVEL', data: 'space-travel', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsK2B5MZ03BV.jpeg'}, 
            {display: 'SUPER HERO', data: 'superhero', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsQuM7LvVNCn.jpeg'},
            {display: 'TIME TRAVEL', data: 'time-travel', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsm9QYRsM9ae.jpeg'}, 
            {display: 'VIRTUAL REALITY', data: 'virtual-reality', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsCQDF0Q14XF.jpeg'}, 
            {display: 'GENERAL SCIENCE FICTION', data: 'science-fiction', image: 'https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkoxsWYyDoadytl.png'}
        ]
    },

    // -- Display Functions --

    fetchDisplay: async function () {
        let display = await _display.fetch() // (2)
        this.setData({ display })
    },

    loadFont: function () {
        wx.loadFontFace({
            family: 'Anurati',
            source: 'url("https://cloud-minapp-32145.cloud.ifanrusercontent.com/1lkpLHvc4hMIYAQm.otf")',
            success: res => console.log(res)
        })
    },

    // -- Lifecycle Functions --
    onLoad: function () {
        this.fetchDisplay();
        this.loadFont();
    }
})