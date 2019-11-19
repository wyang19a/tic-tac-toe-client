'user strict'

const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const onSignUp = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onChangePassword = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onToSignUp = () => {
  ui.onToSignUpSuccess()
}

const onToSignIn = () => {
  ui.onToSignInSuccess()
}

const onClickAccount = () => {
  ui.onClickAccountSuccess()
}

const onGoBack = () => {
  ui.onGoBackSuccess()
}

const addHandlers = event => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.to-sign-up').on('click', onToSignUp)
  $('.to-sign-in').on('click', onToSignIn)
  $('.account').on('click', onClickAccount)
  $('.backButton').on('click', onGoBack)
}

module.exports = {
  addHandlers
}
