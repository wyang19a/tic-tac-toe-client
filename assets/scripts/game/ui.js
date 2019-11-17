'use strict'
const store = require('../store')

$('.game-active-top').hide()
// $('.game-table').hide()

const onSuccess = message => {
  $('#gameMessages')
    .removeClass('failure')
    .addClass('success')
    .text(message)
  // $('form').trigger('reset')
}

const onFailure = message => {
  $('#gameMessages')
    .removeClass('success')
    .addClass('failure')
    .text(message)
  // $('form').trigger('reset')
}

const onMove = (message) => {
  onSuccess(message)
  $('.game-active').show()
  $('.game-inactive').hide()
}

const onGameStartSuccess = responseData => {
  store.game = responseData.game
  // console.log('store.game is', store.game)
  onSuccess('Game started! Make your move.')
  $('.game-active-top').show()
  $('.game-inactive').hide()
}

const onMoveSuccess = (message) => {
  onSuccess(message)
  $('.game-active').show()
  $('.game-inactive').hide()
}

const onMoveFailure = () => {
  onFailure("It's already taken. Please choose another")
}

const onWinner = (message) => {
  onSuccess(message)
  $('.game-active-top').hide()
  $('.game-inactive').show()
}

const onDraw = (message) => {
  onSuccess(message)
  $('.game-active-top').hide()
  $('.game-inactive').show()
}

const onGameFinish = (message) => {
  onSuccess(message)
}
module.exports = {
  onMove,
  onGameStartSuccess,
  onMoveSuccess,
  onMoveFailure,
  onWinner,
  onGameFinish,
  onDraw
}
