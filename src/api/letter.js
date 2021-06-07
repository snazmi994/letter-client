import apiUrl from '../apiConfig'
import axios from 'axios'

// show all posts made by users
export const showLetters = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/letters',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// users are able to post notes
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

// users are able to edit their posts created
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

// delete posts created by users
export const deleteLetter = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/letters/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
