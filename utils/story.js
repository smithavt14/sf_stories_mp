const random = () => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()
    let Story = new wx.BaaS.TableObject('stories')
    let num = Math.ceil(Math.random() * 260) /* (1) */

    query.compare('index', '=', num)

    Story.setQuery(query).find().then(res => {
      let story = res.data.objects[0]
      story.content = story.content.split('/n')
      resolve(story)
    }, err => {
      resolve(err)
    })
  })
}

const setReadSpeed = (story) => {
  return new Promise(resolve => {
    let wordCount = 0
    story.content.forEach((item) => {
      item = item.split(' ')
      let size = item.length
      wordCount += size
    })
    let speed = Math.ceil(wordCount / 250) /* (2 & 3) */
    story['readSpeed'] = speed
    resolve(story)
  })
}

const createFavorite = (story, user) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorites')
    let favorite = Favorite.create()
    let pointers = { user: user.id, story: story.id }

    favorite.set(pointers).save().then(res => {
      console.log(res)
      resolve(res)
    })
  })
}

const deleteFavorite = (favorite) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorites')
    Favorite.delete(favorite.id).then(res => {
      console.log(res)
      resolve(res)
    }, err => {
      console.log(err)
      resolve(err)
    })
  })
}

module.exports = { random, setReadSpeed, createFavorite, deleteFavorite }

/* ----- Notes ----- 

1. Currently there are 260 entries in the story database.
2. Average reading speed is ~250 words per minute.
3. The average reading speed is always rounded up.

*/