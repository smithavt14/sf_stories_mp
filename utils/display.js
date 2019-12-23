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
  return new Promise(resolve => {
    wx.getStorage({
      key: 'display',
      success: display => resolve(display.data),
      fail: err => update(lightMode)
    })
  })
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
    wx.setStorage({
      key: 'display',
      data: display,
      success: display => resolve(fetch())
    })
  })
}

module.exports = { fetch, toggleMode, update }