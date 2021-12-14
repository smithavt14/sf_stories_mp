// ----- Default Variables ----- //
const dark = '#232323';
const light = '#FFFCFC'

const darkMode = {
  mode: 'dark',
  backgroundColor: dark,
  color: light,
  btn: 'Light Mode',
  fontSize: 32,
  fontFamily: {
    active: 0, 
    name: 'serif'
  }
}

const lightMode = {
  mode: 'light',
  backgroundColor: light,
  color: dark,
  btn: 'Dark Mode',
  fontSize: 32,
  fontFamily: {
    active: 0, 
    name: 'serif'
  }
}

// ----- Functions ----- //
const fetch = () => {
  return new Promise(async resolve => {
    let display = wx.getStorageSync('display');
    if (display) resolve(display);
    else {
      wx.setStorageSync('display', lightMode);
      resolve(lightMode);
    }
  })
}

const toggleMode = (display) => {
  let fontSize = display.fontSize
  let fontFamily = display.fontFamily

  display = display.mode === 'light' ? darkMode : lightMode
  display.fontSize = fontSize
  display.fontFamily = fontFamily

  wx.setStorageSync('display', display);

  return(display);
}

const update = (display) => {
  wx.setStorageSync('display', display)
  return(display);
}

module.exports = { fetch, toggleMode, update }