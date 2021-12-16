const fetchAll = (user) => {
  return new Promise(resolve => {
    let query = new wx.BaaS.Query()

    query.compare('user', '=', user.id)

    let Favorite = new wx.BaaS.TableObject('favorite')
    Favorite.setQuery(query).expand(['story']).limit(100).find().then(res => {
      resolve(res.data.objects)
    }, err => {
      console.log(err)
      resolve(null)
    })
  })
}

const fetchCount = (story) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorite');
    let query = new wx.BaaS.Query();

    query.compare('story', '=', story.id)

    Favorite.setQuery(query).count().then(res => {
      resolve(res)
    }, err => {
      console.log(err)
      resolve(null)
    })
  })
}

const add = (user, story) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorite')
    let favorite = Favorite.create()
    let data = {
      user: user.id,
      story: story.id
    }
    
    favorite.set(data).save().then(res => {
      resolve(res)
    }, err => {
      console.log("error msg -->", err)
      resolve(err)
    })
  })
}

const remove = (user, story) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorite')
    let query = new wx.BaaS.Query();
    
    query.compare('story', '=', story.id)
    query.compare('user', '=', user.id)

    Favorite.delete(query).then(res => {
      resolve(res)
    }, err => {
      resolve(err)
    })
  })
}

const active = async (user, story) => {
  return new Promise(resolve => {
    let Favorite = new wx.BaaS.TableObject('favorite')
    let query = new wx.BaaS.Query();
    
    query.compare('story', '=', story.id)
    query.compare('user', '=', user.id)

    Favorite.setQuery(query).count().then(res => {
      resolve(res)
    }, err => {
      resolve(err)
    })
  })
}

module.exports = { fetchAll, add, remove, active, fetchCount}