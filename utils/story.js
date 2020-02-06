const random = () => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()
    let Story = new wx.BaaS.TableObject('story')
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

const queryAll = (user) => {
  return new Promise(resolve => {
    let favorites = user.favorites
    let storyIdArray = favorites.map((item) => item.story.id)
    
    let query = new wx.BaaS.Query()
    let Stories = new wx.BaaS.TableObject('story')
  
    query.in('id', storyIdArray)
  
    Stories.setQuery(query).limit(100).find().then(res => {
      let stories = res.data.objects
      resolve(stories)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

const queryPopular = () => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()
    let Story = new wx.BaaS.TableObject('story')

    query.compare('favorite_num', '>', 0)
    
    Story.setQuery(query).orderBy('favorite_num').limit(10).find().then(res => {
      let stories = res.data.objects
      resolve(stories)
    }, err => {
      console.log(err)
      resolve(undefined)
    })
  })
}

const fetchWithId = (id) => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()
    let Story = new wx.BaaS.TableObject('story')

    query.compare('id', '=', id)

    Story.setQuery(query).find().then(res => {
      let story = res.data.objects[0]
      story.content = story.content.split('/n')
      resolve(story)
    }, err => {
      resolve(err)
    })
  })
}

const varyFavorites = (story, operation) => {
  return new Promise(resolve => {
    let num = story.favorite_num

    let Stories = new wx.BaaS.TableObject('story')
    story = Stories.getWithoutData(story.id)

    num = operation === 'add' ? num + 1 : num - 1

    if (num >= 0) {
      story.set('favorite_num', num)
      story.update().then(res => {
        story = res.data
        story.content = story.content.split('/n')
        resolve(story)
      }, err => {
        console.log(err)
      })
    }
  })
}

module.exports = { random, setReadSpeed, queryAll, fetchWithId, varyFavorites, queryPopular }

/* ----- Notes ----- 

1. Currently there are 260 entries in the story database.
2. Average reading speed is ~250 words per minute.
3. The average reading speed is always rounded up.

*/