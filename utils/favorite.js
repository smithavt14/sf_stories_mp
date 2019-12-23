const fetch = (user) => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()

    query.compare('user', '=', user.id)

    let Favorite = new wx.BaaS.TableObject('favorites')
    Favorite.setQuery(query).find().then(res => {
      resolve(res.data.objects)
    }, err => {
      console.log(err)
    })
  })
}

const add = (user, story) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorites')
    let favorite = Favorite.create()

    let fields = {
      user: user.id,
      story: story.id
    }

    favorite.set(fields).save().then(res => {
      resolve(res)
    }, err => {
      resolve(err)
    })
  })
}

const remove = (favorite) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorites')
    Favorite.delete(favorite.id).then(res => {
      resolve(res)
    }, err => {
      resolve(err)
    })
  })
}

const query = async (user, story) => {
  let favorites = user.favorites
  story.id = story.id

  return new Promise(resolve => {
    if (favorites.length !== 0) {
      favorites.forEach((favorite) => {
        if (favorite.story.id === story.id) {
          resolve(favorite)
        }
      })
      resolve(undefined)
    } else resolve(undefined)
  })
}

module.exports = { fetch, add, remove, query}