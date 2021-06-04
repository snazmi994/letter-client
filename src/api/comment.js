import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (commentData, user, letterId) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/comments',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        content: commentData.content,
        letterId: letterId
      }
    }
  })
}

export const editComment = (commentData, user, id, letterId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/comments/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        content: commentData.content,
        letterId: letterId
      }
    }
  })
}

export const deleteComment = (user, id, letterId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/comments/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        letterId: letterId
      }
    }
  })
}
