const getCurrentUser = () => {
  return new Promise(async resolve => {
    let user = wx.getStorageSync('user')
    if (user) { resolve(user) }
    else {
      wx.BaaS.auth.getCurrentUser().then((user) => {
        wx.setStorageSync('user', user)
        resolve(user)
      }).catch(async err => {
        if ( err.code === 604 ) { 
          let user = await login()
          wx.setStorageSync('user', user)
          resolve(user)
        }
      })
    }
  })
}

const updateUserInfo = () => {
  const _getLoginCode = new Promise(resolve => {
    wx.login({
      success: res => resolve(res.code)
    })
  })

  const _getUserProfile = new Promise(resolve => {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: res => resolve(res)
    })
  })

  Promise.all([_getLoginCode, _getUserProfile]).then(result => {
    const [code, userProfile] = result
    wx.BaaS.auth.updateUserInfo(userProfile, {code}).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
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

module.exports = {getCurrentUser, login, logout, updateUserInfo}