const getCurrentUser = () => {
  return new Promise(resolve => {
    wx.BaaS.auth.getCurrentUser().then(user => {
      console.log(user)
      resolve(user)
    }).catch(err => {
      if (err.code === 604) {
        console.log('用户未登录')
      }
      resolve(null)
    })
  })
}

const login = () => {
  return new Promise(resolve => {
    wx.BaaS.auth.loginWithWechat().then(user => {
      resolve(user)
    }, err => {
      console.log(err)
      resolve(null)
    })
  })
}

const logout = () => {
  wx.BaaS.auth.logout()
}

module.exports = {getCurrentUser, login, logout}