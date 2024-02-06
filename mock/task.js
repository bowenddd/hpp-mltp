const Mock = require('mockjs')

const TaskList = []

const baseTaskContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
TaskList.push(Mock.mock({
  id: 0,
  timestamp: '2024-02-04 11:16',
  author: 'admin',
  title: '模型训练-H3.6M',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: 'H3.6M',
  type: 'train',
  status: 'published',
  model: 'MSHPP',
  num: 1,
  args: '{"exp_name":"h36m" "is_train":1 "output_n":10 "dct_n":60 "test_manner":"all"}'
}))
TaskList.push(Mock.mock({
  id: 1,
  timestamp: '2024-02-02 13:10',
  author: 'admin',
  title: '模型推理-H3.6M',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: 'H3.6M',
  type: 'inference',
  status: 'published',
  num: 1,
  model: 'MSHPP'
}))
TaskList.push(Mock.mock({
  id: 2,
  timestamp: '2024-02-02 17:58',
  author: 'admin',
  title: '多尺度提取-H3.6M',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: 'H3.6M',
  type: 'scale',
  num: 1,
  nums: 22,
  status: 'published'
}))
TaskList.push(Mock.mock({
  id: 3,
  timestamp: '2024-02-03 10:21',
  author: 'admin',
  title: '多模态提取-H3.6M',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: 'H3.6M',
  num: 1,
  type: 'modality',
  status: 'published'
}))
TaskList.push(Mock.mock({
  id: 4,
  timestamp: '2024-02-05 19:45',
  author: 'admin',
  title: '测试任务',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: '测试数据集',
  type: 'train',
  num: 1,
  status: ''
}))
TaskList.push(Mock.mock({
  id: 5,
  timestamp: '2024-02-05 20:19',
  author: 'admin',
  title: '测试任务-2',
  content_short: 'mock data',
  content: baseTaskContent,
  dataset: '测试数据集',
  type: 'train',
  num: 1,
  status: 'deleted'
}))

module.exports = [
  {
    url: '/vue-element-admin/task/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = TaskList.filter(item => {
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
    url: '/vue-element-admin/task/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of TaskList) {
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
    url: '/vue-element-admin/task/pv',
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
    url: '/vue-element-admin/task/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/task/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

