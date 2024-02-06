/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const taskRouter = {
  path: '/task',
  component: Layout,
  redirect: '/task/list',
  name: 'Task',
  meta: {
    title: '任务管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/table/task-table'),
      name: '任务列表',
      meta: { title: '任务列表' }
    },
    {
      path: 'train',
      component: () => import('@/views/model/train'),
      name: '模型训练',
      meta: { title: '模型训练' }
    },
    {
      path: 'inference',
      component: () => import('@/views/model/inference'),
      name: '模型推理',
      meta: { title: '模型推理' }
    }
  ]
}
export default taskRouter
