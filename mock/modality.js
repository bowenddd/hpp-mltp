const Mock = require('mockjs')

const ModalityList = []

const baseModalityContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
ModalityList.push(Mock.mock({
  id: 0,
  timestamp: '2024-02-03 14:55',
  author: 'admin',
  title: 'H3.6M-scale-22',
  content_short: 'mock data',
  content: baseModalityContent,
  size: 562,
  type: 'keypoint',
  status: 'published'
}))
ModalityList.push(Mock.mock({
  id: 1,
  timestamp: '2024-02-03 15:11',
  author: 'admin',
  title: 'H3.6M-scale-22',
  content_short: 'mock data',
  content: baseModalityContent,
  size: 1024 * 22,
  type: 'heatmap',
  status: 'published'
}))
ModalityList.push(Mock.mock({
  id: 2,
  timestamp: '2024-02-04 16:48',
  author: 'admin',
  title: 'H3.6M-scale-22',
  content_short: 'mock data',
  content: baseModalityContent,
  size: 438,
  type: 'speed',
  status: 'published'
}))
ModalityList.push(Mock.mock({
  id: 3,
  timestamp: '2024-02-04 18:27',
  author: 'admin',
  title: 'CMU Mocap',
  content_short: 'mock data',
  content: baseModalityContent,
  size: 766,
  type: 'keypoint',
  status: 'published'
}))
ModalityList.push(Mock.mock({
  id: 4,
  timestamp: '2024-02-05 09:44',
  author: 'admin',
  title: '测试数据集',
  content_short: 'mock data',
  content: baseModalityContent,
  size: 1,
  type: 'keypoint',
  status: 'published'
}))

module.exports = [
  {
    url: '/vue-element-admin/modality/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = ModalityList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
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
    url: '/vue-element-admin/modality/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of ModalityList) {
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
    url: '/vue-element-admin/modality/pv',
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
    url: '/vue-element-admin/modality/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/modality/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

