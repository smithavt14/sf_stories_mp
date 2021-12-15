// ----- Default Variables ----- //
const dark = '#232323';
const light = '#FFFCFC';
const sepia = '#F5F1E4';

const modes = {
  dark: {
    name: 'dark',
    backgroundColor: dark,
    color: light,
    highlight:  '#05BEF5',
    btn: 'dark',
    fontSize: 48,
    fontFamily: {
      active: 0, 
      name: 'serif'
    }
  },
  light: {
    name: 'light',
    backgroundColor: light,
    color: dark,
    highlight: '#FF00B1',
    btn: 'light',
    fontSize: 48,
    fontFamily: {
      active: 0, 
      name: 'serif'
    }
  }, 
  sepia: {
    name: 'sepia',
    backgroundColor: sepia,
    color: dark,
    highlight: '#C09944',
    btn: 'light',
    fontSize: 48,
    fontFamily: {
      active: 0, 
      name: 'serif'
    }
  }
}

// ----- Functions ----- //
const fetch = () => {
  return new Promise(async resolve => {
    let display = wx.getStorageSync('display');
    if (display) resolve(display);
    else {
      wx.setStorageSync('display', modes.dark);
      resolve(modes.dark);
    }
  })
}

const toggleMode = (display) => {
  let fontSize = display.fontSize
  let fontFamily = display.fontFamily
  let name = display.name

  if (name === 'dark') { 
    name = 'light' 
  } else if (name === 'light') {
    name = 'sepia'
  } else if (name === 'sepia') {
    name = 'dark'
  }

  display = modes[name]
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