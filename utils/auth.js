const getCurrentUser = () => {
  return new Promise(resolve => {
    try {
      let user = wx.getStorageSync('user')
      resolve(user)
    } catch (e) {
      wx.BaaS.auth.getCurrentUser().then((user) => {
        console.log(user)
        resolve(user)
      })
    } finally {
      resolve()
    }
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