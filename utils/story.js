const random = () => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()
    let Story = new wx.BaaS.TableObject('stories')
    let num = Math.ceil(Math.random() * 42)

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

module.exports = { random }