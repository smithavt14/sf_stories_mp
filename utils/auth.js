const getCurrentUser = () => {
  return new Promise(resolve => {
    wx.getStorage({
      key: 'user',
      success: res => resolve(res.data),
      fail: async err => {
        wx.BaaS.auth.getCurrentUser().then(user => {
          resolve(user)
        })
      }
    })
  })
}

const login = (data) => {
  return new Promise(resolve => {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      resolve(user)
    }, err => {
      console.log(err)
      resolve(null)
    })
  })
}

const logout = () => {
  wx.BaaS.auth.logout()
  wx.setStorageSync('user', undefined)
}

module.exports = {getCurrentUser, login, logout}