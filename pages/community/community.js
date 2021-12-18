const _display = require('../../utils/display.js')

Page({
    data: {},

    // -- Clipboard Functions --

    setClipboardData: function () {
        wx.setClipboardData({
            data: 'smithalexvt14',
            success: () => {
                wx.showToast({
                    title: 'Copied',
                    icon: 'success'
                })
            }
          })
    },
    // -- Display Functions -- 

    fetchDisplay: async function () {
        let display = await _display.fetch()
        this.setData({ display })
    },
    
    // -- Navigation Functions --

    navigateBack: function () {
        wx.navigateBack({})
    },

    onShow: function (options) {
        this.fetchDisplay()
    },
})