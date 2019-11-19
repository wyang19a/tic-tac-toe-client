'use strict'

const store = require('../store')

$('.afterSignIn').hide()
$('.accountMenu').hide()
$('.sign-up-form').hide()

const onSuccess = message => {
  $('.message')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  $('form').trigger('reset')
}

const onFailure = message => {
  $('.message')
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
  $('.account-messages').html('Password change successful.')
  $('form').trigger('reset')
}

const onChangePasswordFailure = () => {
  $('.account-messages').html('Invalid password. Please try again.')
  $('form').trigger('reset')
}

const onSignOutSuccess = () => {
  store.user = {}
  onSuccess('Signed out!')
  $('.afterSignIn').hide()
  $('.beforeSignIn').show()
  $('#gameErrors').hide()
}

const onClickAccountSuccess = () => {
  $('.afterSignIn').hide()
  $('.beforeSignIn').hide()
  $('.accountMenu').show()
}

const onGoBackSuccess = () => {
  $('.afterSignIn').show()
  $('.accountMenu').hide()
  $('.account-messages').html('')
  $('#results').html('')
}

const onToSignUpSuccess = () => {
  $('.sign-up-form').show()
  $('.sign-in-form').hide()
  $('.message').html('')
  $('form').trigger('reset')
}

const onToSignInSuccess = () => {
  $('.sign-up-form').hide()
  $('.sign-in-form').show()
  $('.message').html('')
}

module.exports = {
  onSignUpFailure,
  onSignUpSuccess,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onClickAccountSuccess,
  onToSignInSuccess,
  onToSignUpSuccess,
  onGoBackSuccess
}
