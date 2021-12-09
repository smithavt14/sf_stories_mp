// ----- Default Variables ----- //
const dark = '#232323';
const light = '#FFFCFC'

const darkMode = {
  mode: 'dark',
  backgroundColor: dark,
  color: light,
  btn: 'Light Mode',
  fontSize: 32
}

const lightMode = {
  mode: 'light',
  backgroundColor: light,
  color: dark,
  btn: 'Dark Mode',
  fontSize: 32
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

  display = display.mode === 'light' ? darkMode : lightMode
  display.fontSize = fontSize

  wx.setStorageSync('display', display);

  return(display);
}

const update = (display) => {
  wx.setStorageSync('display', display)
  return(display);
}

module.exports = { fetch, toggleMode, update }