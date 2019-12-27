const getCurrentUser = () => {
  return new Promise(resolve => {
    let user = wx.getStorageSync('user')
    if (user) { resolve(user) } 
    else {
      wx.BaaS.auth.getCurrentUser().then((user) => {
        console.log(user)
        wx.setStorageSync('user', user)
        resolve(user)
      })
    }
  })
}

const login = (data) => {
  return new Promise(resolve => {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user)
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