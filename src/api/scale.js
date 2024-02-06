import request from '@/utils/request'

export function fetchScaleList(query) {
  return request({
    url: '/vue-element-admin/scale/list',
    method: 'get',
    params: query
  })
}

export function fetchScale(id) {
  return request({
    url: '/vue-element-admin/scale/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchScalePv(pv) {
  return request({
    url: '/vue-element-admin/scale/pv',
    method: 'get',
    params: { pv }
  })
}

export function createScale(data) {
  return request({
    url: '/vue-element-admin/scale/create',
    method: 'post',
    data
  })
}

export function updateScale(data) {
  return request({
    url: '/vue-element-admin/scale/update',
    method: 'post',
    data
  })
}
