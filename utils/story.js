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

module.exports = { random, setReadSpeed }

/* ----- Notes ----- 

1. Currently there are 260 entries in the story database.
2. Average reading speed is ~250 words per minute.
3. The average reading speed is always rounded up.

*/