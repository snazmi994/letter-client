import apiUrl from '../apiConfig'
import axios from 'axios'

export const showLetters = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/letters',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createLetter = (letterData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/letters',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      letter: {
        title: letterData.title,
        body: letterData.body
      }
    }
  })
}

export const editLetter = (letterData, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/letters/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      letter: {
        title: letterData.title,
        body: letterData.body
      }
    }
  })
}

export const deleteLetter = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/letters/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
