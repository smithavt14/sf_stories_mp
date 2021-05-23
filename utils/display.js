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