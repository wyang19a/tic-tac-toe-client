'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onGetAllGames = () => {
  api.getAllGames()
    .then(ui.getGamesSuccess)
}

const onGetOneGame = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.getOneGame(formData)
    .then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
}

// start with currentPlayer X, change back and forth depending what's in currentPlayer.
let currentPlayer = 'X'
// set move number to 1 becuase moveNum = 0 will block new game from starting.
// moveNum will be set to 0 when user clicks New Game.
let moveNum = 1
const toggleTurn = () => {
  // if current player is X, change current player to O and add number of move.
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
    moveNum += 1
    ui.onMove('Turn: O')
    // if current player is O, change current player to X and add number of move.
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
    moveNum += 1
    ui.onMove('Turn: X')
  }
}

// start a new game
const onNewGame = () => {
  // console.log('new game')
  // if there is a stored game and player did not make a move yet,
  if (store.game !== {} && moveNum === 0) {
    // show game start failure message.
    ui.onGameStartFailure()
    // otherwise, start a new game, show game start success message.
  } else {
    api.newGame()
      .then(ui.onGameStartSuccess)
    // upon starting a new game, empty boxes and hide previous game error.
    $('td').html('')
    $('#gameErrors').hide()
    // reset move number to 0, and current player to X.
    moveNum = 0
    currentPlayer = 'X'
    // console.log(store.game)
  }
}
// define end game.
const endGame = () => {
  // upon 9 moves, set game.over = true, reset moveNum to 1, currentPlayer to X.
  // call draw message.
  if (moveNum === 9) {
    store.game.over = true
    moveNum = 1
    currentPlayer = 'X'
    ui.onDraw()
  }
  // resets stored game info when game is over.
  if (store.game.over === true) {
    currentPlayer = 'X'
    store.game = {}
    // return ui.onGameFinish()
  }
}
// define what to do when user clicks in boxes.
const onPlayMove = event => {
  const clickOnGrid = $(event.target)
  const gridID = event.target.id
  const putValue = () => {
    // if there is no value inside clicked box, run toggleTurn() and pass in currentPlayer
    // otherwise, there is any value and game is not over yet, display move fail message.
    if (clickOnGrid.html() === '') {
      store.game.cells[gridID] = currentPlayer
      // set color of X and O.
      if (currentPlayer === 'O') {
        clickOnGrid.css('color', '#2499A6')
      } else {
        clickOnGrid.css('color', '#E85A4F')
      }
      // console.log('here', store.game)
      // pass in grid's currentPlayer to html and toggle turn.
      clickOnGrid.html(currentPlayer, toggleTurn())
      ui.onMoveSuccess()
    } else if (store.game.over === false) {
      ui.onMoveFailure()
    }
  }
  putValue()
  // console.log(moveNum)
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
      // reset game move to 1, set game over, and display winner X
      moveNum = 1
      store.game.over = true
      // currentPlayer = 'X'
      ui.onWinner('X wins!')
    } else if ((storedCell[0] === 'O' && storedCell[1] === 'O' && storedCell[2] === 'O') ||
      (storedCell[0] === 'O' && storedCell[3] === 'O' && storedCell[6] === 'O') ||
      (storedCell[0] === 'O' && storedCell[4] === 'O' && storedCell[8] === 'O') ||
      (storedCell[1] === 'O' && storedCell[4] === 'O' && storedCell[7] === 'O') ||
      (storedCell[2] === 'O' && storedCell[4] === 'O' && storedCell[6] === 'O') ||
      (storedCell[2] === 'O' && storedCell[5] === 'O' && storedCell[8] === 'O') ||
      (storedCell[3] === 'O' && storedCell[4] === 'O' && storedCell[5] === 'O') ||
      (storedCell[6] === 'O' && storedCell[7] === 'O' && storedCell[8] === 'O')) {
      // reset game move to 1, set game over, and display winner O
      moveNum = 1
      store.game.over = true
      // currentPlayer = 'X'
      ui.onWinner('O Wins!')
    }
  }
  checkForWin()
  // send game grid id, "previous" current player, and game over info to api for update.
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
  $('.new-game').on('click', onNewGame)
  $('.get-all-games').on('click', onGetAllGames)
  $('.get-one-game').on('submit', onGetOneGame)
}

module.exports = {
  addHandlers
}
