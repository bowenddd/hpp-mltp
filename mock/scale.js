const Mock = require('mockjs')

const ScaleList = []

const baseScaleContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
ScaleList.push(Mock.mock({
  id: 0,
  timestamp: '2024-02-02 13:22',
  author: 'admin',
  title: 'H3.6M',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 562,
  scaleNum: 22,
  status: 'published'
}))
ScaleList.push(Mock.mock({
  id: 1,
  timestamp: '2024-02-02 13:25',
  author: 'admin',
  title: 'H3.6M',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 277,
  scaleNum: 12,
  status: 'published'
}))
ScaleList.push(Mock.mock({
  id: 2,
  timestamp: '2024-02-02 13:28',
  author: 'admin',
  title: 'H3.6M',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 195,
  scaleNum: 7,
  status: 'published'
}))
ScaleList.push(Mock.mock({
  id: 3,
  timestamp: '2024-02-03 11:47',
  author: 'admin',
  title: 'H3.6M',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 106,
  scaleNum: 4,
  status: 'published'
}))
ScaleList.push(Mock.mock({
  id: 4,
  timestamp: '2024-02-01 16:22',
  author: 'admin',
  title: '测试数据集1',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 1,
  scaleNum: 22,
  status: 'published'
}))
ScaleList.push(Mock.mock({
  id: 5,
  timestamp: '2024-02-01 17:35',
  author: 'admin',
  title: '测试数据集2',
  content_short: 'mock data',
  content: baseScaleContent,
  size: 1,
  scaleNum: 12,
  status: 'published'
}))

module.exports = [
  {
    url: '/vue-element-admin/scale/list',
    type: 'get',
    response: config => {
      const { importance, scaleNum, title, page = 1, limit = 20, sort } = config.query

      let mockList = ScaleList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (scaleNum && item.scaleNum !== parseInt(scaleNum)) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/scale/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of ScaleList) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/scale/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/scale/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/scale/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

