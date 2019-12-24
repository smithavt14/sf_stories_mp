// ----- Default Variables ----- //
const darkMode = {
  mode: 'dark',
  backgroundColor: '#232323',
  color: '#FFFCFC',
  btn: 'Light Mode',
  fontSize: 32
}

const lightMode = {
  mode: 'light',
  backgroundColor: '#FFFCFC',
  color: '#232323',
  btn: 'Dark Mode',
  fontSize: 32
}

// ----- Functions ----- //
const fetch = () => {
  return new Promise(async resolve => {
      wx.getStorage({
        key: 'display',
        success (res) { resolve(res.data) }, 
        fail (err) { 
          wx.setStorageSync('display', lightMode)
          resolve(lightMode)
         }
      })
    })
      // let display = await update(lightMode)
      // resolve(display)
}

const toggleMode = (display) => {
  return new Promise(resolve => {
    let fontSize = display.fontSize

    display = display.mode === 'light' ? darkMode : lightMode
    display.fontSize = fontSize

    wx.setStorage({
      key: 'display',
      data: display,
      success: res => resolve(fetch())
    })
  })
}

const update = (display) => {
  return new Promise(resolve => {
    wx.setStorageSync('display', display)
    resolve(display)
  })
}

module.exports = { fetch, toggleMode, update }