'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')

const onGetAllGames = () => {
  api.getAllGames()
    .then(ui.getGamesSuccess) // .then() returns successful result
    .catch(ui.getGamesFailure) // .catch() returns failed result
}

// start with currentPlayer X, change back and forth depending what's in currentPlayer.
let currentPlayer = 'X'
let moveNum = 0
const toggleTurn = () => {
  // if current player is X, change current player to O and add number of move.
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
    moveNum += 1
    return ui.onMove('Turn: O')
  // if current player is O, change current player to X and add number of move.
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
    moveNum += 1
    return ui.onMove('Turn: X')
  }
}
const onNewGame = () => {
  // console.log('new game')
  api.newGame()
    .then(ui.onGameStartSuccess)
    .catch(ui.onGameStartFailure)
  $('td').html('')
  $('#gameErrors').hide()
  moveNum = 0
  currentPlayer = 'X'
}

// listen for click, push X or O only if there's no string inside.
const endGame = () => {
  if (moveNum === 9) {
    moveNum = 0
    currentPlayer = 'X'
    store.game.over = true
    return ui.onDraw("It's a tie")
  }
  // resets stored game info when game is over.
  if (store.game.over === true) {
    currentPlayer = 'X'
    store.game = {}
  // return ui.onGameFinish('Click start over to play again!')
  }
}
const onPlayMove = event => {
  const clickOnGrid = $(event.target)
  const gridID = event.target.id
  const putValue = () => {
    // if there is no value inside clicked box, run toggleTurn() and pass in currentPlayer
    if (clickOnGrid.html() === '') {
      store.game.cells[gridID] = currentPlayer
      console.log('here', store.game)
      // let over = store.game.over
      clickOnGrid.html(currentPlayer, toggleTurn())
      return ui.onMoveSuccess()
    } else if (store.game.over === false) {
      return ui.onMoveFailure()
    }
  }
  putValue()
  console.log(moveNum)
  // console.log(clickOnGrid)
  const storedCell = store.game.cells
  // check for winner
  const checkForWin = () => {
    if ((storedCell[0] === 'X' && storedCell[1] === 'X' && storedCell[2] === 'X') ||
    (storedCell[0] === 'X' && storedCell[3] === 'X' && storedCell[6] === 'X') ||
    (storedCell[0] === 'X' && storedCell[4] === 'X' && storedCell[8] === 'X') ||
    (storedCell[1] === 'X' && storedCell[4] === 'X' && storedCell[7] === 'X') ||
    (storedCell[2] === 'X' && storedCell[4] === 'X' && storedCell[6] === 'X') ||
    (storedCell[2] === 'X' && storedCell[5] === 'X' && storedCell[8] === 'X') ||
    (storedCell[3] === 'X' && storedCell[4] === 'X' && storedCell[5] === 'X') ||
    (storedCell[6] === 'X' && storedCell[7] === 'X' && storedCell[8] === 'X')) {
      // reset game move to 0, set game over, and display winner X
      moveNum = 0
      store.game.over = true
      // currentPlayer = 'X'
      return ui.onWinner('X wins!')
    } else if ((storedCell[0] === 'O' && storedCell[1] === 'O' && storedCell[2] === 'O') ||
    (storedCell[0] === 'O' && storedCell[3] === 'O' && storedCell[6] === 'O') ||
    (storedCell[0] === 'O' && storedCell[4] === 'O' && storedCell[8] === 'O') ||
    (storedCell[1] === 'O' && storedCell[4] === 'O' && storedCell[7] === 'O') ||
    (storedCell[2] === 'O' && storedCell[4] === 'O' && storedCell[6] === 'O') ||
    (storedCell[2] === 'O' && storedCell[5] === 'O' && storedCell[8] === 'O') ||
    (storedCell[3] === 'O' && storedCell[4] === 'O' && storedCell[5] === 'O') ||
    (storedCell[6] === 'O' && storedCell[7] === 'O' && storedCell[8] === 'O')) {
      // reset game move to 0, set game over, and display winner O
      moveNum = 0
      store.game.over = true
      // currentPlayer = 'X'
      return ui.onWinner('O Wins!')
    }
  }
  checkForWin()
  let actualPlayer
  if (currentPlayer === 'X') {
    actualPlayer = 'O'
  } else {
    actualPlayer = 'X'
  }
  api.updateGame(gridID, actualPlayer, store.game.over)
  endGame()
}
const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
  $('.newGame').on('click', onNewGame)
  $('.getAllGames').on('click', onGetAllGames)
}

module.exports = {
  addHandlers
}
