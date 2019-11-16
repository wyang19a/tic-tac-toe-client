'use strict'
const store = require('../store')

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

const onGameStartSuccess = responseData => {
  store.game = responseData.game
  // console.log('store.game is', store.game)
  onSuccess('Game started! Make your move.')
  $('.game-active').show()
  $('.game-inactive').hide()
}

// const onMoveSuccess = () => {
//   console.log('MOVES')
//   $('.game-active').show()
//   $('.game-inactive').hide()
// }
//
// const onMoveFailure = () => {
//   onFailure('That box is already taken. Choose another one.')
// }

const onWinner = () => {

}

const onDraw = () => {

}

module.exports = {
  onGameStartSuccess,
  // onMoveSuccess,
  // onMoveFailure,
  onWinner,
  onDraw
}
