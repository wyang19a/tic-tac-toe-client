'use strict'

const config = require('../config')
const store = require('../store')

const signUp = signUpData => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: signUpData
  })
}

const signIn = signInData => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: signInData
  })
}

const changePassword = passwordData => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: passwordData
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
