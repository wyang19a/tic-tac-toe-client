'use strict'
const store = require('../store')

$('.game-active-top').hide()
// $('.game-table').hide()

const getGamesSuccess = response => {
  const games = response.games

  let gamesHtml = ''

  games.forEach(games => {
    gamesHtml += `
      <h4>${games.id}</h4>
      <h5>${games.cells}</h5>
      <p>${games.over}</p>
      <p>${games.player_x.email}</p>
    `
  })
  $('#results').html(gamesHtml)
}

const onSuccess = message => {
  $('#gameMessages')
    .removeClass('failure')
    .addClass('success')
    .text(message)
}

const onFailure = message => {
  $('#gameMessages')
    .removeClass('success')
    .addClass('failure')
    .text(message)
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
const onGameStartFailure = (message) => {
  onFailure(message)
}
const onMoveSuccess = (message) => {
  onSuccess(message)
  $('.game-active').show()
  $('.game-inactive').hide()
  $('#gameErrors').hide()
}

const onMoveFailure = () => {
  $('#gameErrors').html('Box already taken. Please choose another').show()
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
  onGameStartFailure,
  onMoveSuccess,
  onMoveFailure,
  onWinner,
  onGameFinish,
  onDraw,
  getGamesSuccess
}
