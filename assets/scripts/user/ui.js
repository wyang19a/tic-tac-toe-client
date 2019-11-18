'use strict'

const store = require('../store')

$('.afterSignIn').hide()
$('.accountMenu').hide()

const onSuccess = message => {
  $('#message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  $('form').trigger('reset')
}

const onFailure = message => {
  $('#message')
    .removeClass('success')
    .addClass('failure')
    .text(message)
  $('form').trigger('reset')
}

const onSignUpSuccess = () => {
  onSuccess('You Signed Up Successfully! Now, signed in.')
}

const onSignUpFailure = () => {
  onFailure('Try Again.')
}

const onSignInSuccess = responseData => {
  store.user = responseData.user // add token to store
  store.game = {}
  $('td').html('')
  $('#gameMessages').html('')
  $('.game-inactive').show()
  $('.game-active-top').hide()
  // console.log('user is', store.user)
  onSuccess('You are signed in!')
  $('.afterSignIn').show()
  $('.beforeSignIn').hide()
}

const onSignInFailure = () => {
  onFailure('Invalid email or password. Please try again.')
}

const onChangePasswordSuccess = () => {
  onSuccess('Password change successful.')
  $('form').trigger('reset')
}

const onChangePasswordFailure = () => {
  $('.accountMessages').html('Invalid password. Please try again.')
  $('form').trigger('reset')
}

const onSignOutSuccess = () => {
  store.user = {} // remove token from store.js
  onSuccess('Signed out!')
  $('.afterSignIn').hide()
  $('.beforeSignIn').show()
  $('#gameErrors').hide()
  // console.log(store.user)
}

module.exports = {
  onSignUpFailure,
  onSignUpSuccess,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess
}
