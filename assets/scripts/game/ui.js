'use strict'
const store = require('../store')

$('.game-active-top').hide()
// $('.game-table').hide()
const getGamesSuccess = response => {
  const games = response.games

  let gamesHtml = ''

  games.forEach(games => {
    gamesHtml += `
      <h4>Game ID: ${games.id}</h4>
      <table class="game-table">
        <tr>
          <td class="recordCell">${games.cells[0]}</td>
          <td class="recordCell">${games.cells[1]}</td>
          <td class="recordCell">${games.cells[2]}</td>
        </tr>
        <tr>
          <td class="recordCell">${games.cells[3]}</td>
          <td class="recordCell">${games.cells[4]}</td>
          <td class="recordCell">${games.cells[5]}</td>
        </tr>
        <tr>
          <td class="recordCell">${games.cells[6]}</td>
          <td class="recordCell">${games.cells[7]}</td>
          <td class="recordCell">${games.cells[8]}</td>
        </tr>
      </table>
      <p>Game over? ${games.over}</p>
      <p>User email: ${games.player_x.email}</p>
    `
  })
  $('#results').html('</br>You played ' + games.length + ' games. </br></br>' + gamesHtml)
}

const getGameSuccess = (data) => {
  const game = data.game
  const bookHtml = `
  <h4>Game ID: ${game.id}</h4>
  <table class="game-table">
    <tr>
      <td class="recordCell">${game.cells[0]}</td>
      <td class="recordCell">${game.cells[1]}</td>
      <td class="recordCell">${game.cells[2]}</td>
    </tr>
    <tr>
      <td class="recordCell">${game.cells[3]}</td>
      <td class="recordCell">${game.cells[4]}</td>
      <td class="recordCell">${game.cells[5]}</td>
    </tr>
    <tr>
      <td class="recordCell">${game.cells[6]}</td>
      <td class="recordCell">${game.cells[7]}</td>
      <td class="recordCell">${game.cells[8]}</td>
    </tr>
  </table>
  <p>Game over? ${game.over}</p>
  <p>User email: ${game.player_x.email}</p>
  `
  $('#results').html('').html(bookHtml)
  $('form').trigger('reset')
}

const getGameFailure = () => {
  $('.account-messages').html('Invalid game ID. Please try again.')
  $('form').trigger('reset')
}

const onSuccess = message => {
  $('#gameMessages').html(message)
}

const onMove = (message) => {
  onSuccess(message)
}

const gameStartMessage = 'Game started! Game ID: '
const onGameStartSuccess = responseData => {
  store.game = responseData.game
  // console.log('store.game is', store.game)
  onSuccess('Make your first move.')
  $('.game-active-top').show().html(gameStartMessage + store.game.id)
  $('.game-inactive').hide()
  $('#gameMessages').removeClass('game-result-message').css('color', 'black')
}

const onGameStartFailure = () => {
  $('.game-active-top').html('Game already started.')
}

const onMoveSuccess = (message) => {
  $('#gameErrors').hide()
  $('.game-active-top').show().html(gameStartMessage + store.game.id)
}

const onMoveFailure = () => {
  $('#gameErrors').html('Box already taken. Please choose another').show()
}

const onWinner = (message) => {
  onSuccess(message)
  $('#gameMessages').addClass('game-result-message')
  $('.game-active-top').hide()
  $('.game-inactive').show()
  if ($('#gameMessages').text() === 'X wins!') {
    $('#gameMessages').css('color', '#E85A4F')
  } else {
    $('#gameMessages').css('color', '#2499A6')
  }
}

const onDraw = () => {
  onSuccess("It's a tie. </br> Try again!")
  $('.game-active-top').hide()
  $('.game-inactive').show()
}

module.exports = {
  onMove,
  onGameStartSuccess,
  onGameStartFailure,
  onMoveSuccess,
  onMoveFailure,
  onWinner,
  onDraw,
  getGamesSuccess,
  getGameSuccess,
  getGameFailure
}
