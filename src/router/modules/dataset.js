/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataSetRouter = {
  path: '/dataset',
  component: Layout,
  redirect: '/dataset/list',
  name: 'Dataset',
  meta: {
    title: '数据集管理',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'multi-scale',
      component: () => import('@/views/table/scale-dataset-table'),
      name: '多尺度数据集',
      meta: { title: '多尺度数据集' }
    },
    {
      path: 'multi-model',
      component: () => import('@/views/table/modality-dataset-table'),
      name: '多模态数据集',
      meta: { title: '多模态数据集' }
    }
  ]
}
export default dataSetRouter
