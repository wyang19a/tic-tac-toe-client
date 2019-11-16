'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')

// const currentPlayer = 'X'

// const emptyBoard = ['', '', '', '', '', '', '', '', '']

const onNewGame = () => {
  // console.log('new game')
  api.newGame()
    .then(ui.onGameStartSuccess)
    .catch(console.error)
  $('td').html('')
}
// const onApiMove = () => {
//   api.playMove()
//     .then(ui.onMoveSuccess)
//     .catch(ui.onMoveFailure)
// }
// assign grid to emptyBoard[i]
// push currentPlayer to emptyBoard[i] by clicking on a grid

// start with currentPlayer X, change back and forth depending what's in currentPlayer.
let currentPlayer = 'X'
const toggleTurn = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
  }
}

// listen for click, push X or O only if there's no string inside.

const onPlayMove = event => {
  const clickOnGrid = $(event.target)
  const pushGridID = event.target.id
  const putValue = () => {
    // if there is no value inside clicked box, run toggleTurn() and pass in currentPlayer
    if (clickOnGrid.html() === '') {
      store.game.cells[pushGridID] = currentPlayer
      clickOnGrid.html(currentPlayer, toggleTurn())
      // else, if there's any html, do nothing and just console log for now.
    }
    const storedCell = store.game.cells
    const checkForWin = () => {
      if ((storedCell[0] === 'X' && storedCell[1] === 'X' && storedCell[2] === 'X') ||
      (storedCell[0] === 'X' && storedCell[3] === 'X' && storedCell[6] === 'X') ||
      (storedCell[0] === 'X' && storedCell[4] === 'X' && storedCell[8] === 'X') ||
      (storedCell[1] === 'X' && storedCell[4] === 'X' && storedCell[7] === 'X') ||
      (storedCell[2] === 'X' && storedCell[4] === 'X' && storedCell[6] === 'X') ||
      (storedCell[2] === 'X' && storedCell[5] === 'X' && storedCell[8] === 'X') ||
      (storedCell[3] === 'X' && storedCell[4] === 'X' && storedCell[5] === 'X') ||
      (storedCell[6] === 'X' && storedCell[7] === 'X' && storedCell[8] === 'X')) {
        console.log('X wins')
      } else if ((storedCell[0] === 'O' && storedCell[1] === 'O' && storedCell[2] === 'O') ||
      (storedCell[0] === 'O' && storedCell[3] === 'O' && storedCell[6] === 'O') ||
      (storedCell[0] === 'O' && storedCell[4] === 'O' && storedCell[8] === 'O') ||
      (storedCell[1] === 'O' && storedCell[4] === 'O' && storedCell[7] === 'O') ||
      (storedCell[2] === 'O' && storedCell[4] === 'O' && storedCell[6] === 'O') ||
      (storedCell[2] === 'O' && storedCell[5] === 'O' && storedCell[8] === 'O') ||
      (storedCell[3] === 'O' && storedCell[4] === 'O' && storedCell[5] === 'O') ||
      (storedCell[6] === 'O' && storedCell[7] === 'O' && storedCell[8] === 'O')) {
        console.log('O wins')
      }
    }
    checkForWin()
    console.log(store.game.cells)
  }
  putValue()
  // console.log(clickOnGrid)
}

// checForWin should be done after each click
// if combination matches, games stops
//

const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
  // $('.game-table').on('click', onApiMove)
  $('.newGame').on('click', onNewGame)
}

module.exports = {
  addHandlers
}
