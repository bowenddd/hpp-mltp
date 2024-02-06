import request from '@/utils/request'

export function fetchModalityList(query) {
  return request({
    url: '/vue-element-admin/modality/list',
    method: 'get',
    params: query
  })
}

export function fetchModality(id) {
  return request({
    url: '/vue-element-admin/modality/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchModalityPv(pv) {
  return request({
    url: '/vue-element-admin/modality/pv',
    method: 'get',
    params: { pv }
  })
}

export function createModality(data) {
  return request({
    url: '/vue-element-admin/modality/create',
    method: 'post',
    data
  })
}

export function updateModality(data) {
  return request({
    url: '/vue-element-admin/modality/update',
    method: 'post',
    data
  })
}
