'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')

const onNewGame = () => {
  // console.log('new game')
  api.newGame()
    .then(ui.onGameStartSuccess)
    .catch(console.error)
  $('td').html('')
}

// start with currentPlayer X, change back and forth depending what's in currentPlayer.
let currentPlayer = 'X'
let moveNum = 0
const toggleTurn = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
    moveNum += 1
    return ui.onMoveSuccess('Turn: O')
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
    moveNum += 1
    return ui.onMoveSuccess('Turn: X')
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
        moveNum = 0
        store.game.over = true
        currentPlayer = 'X'
        return ui.onWinner('X wins!')
      } else if ((storedCell[0] === 'O' && storedCell[1] === 'O' && storedCell[2] === 'O') ||
      (storedCell[0] === 'O' && storedCell[3] === 'O' && storedCell[6] === 'O') ||
      (storedCell[0] === 'O' && storedCell[4] === 'O' && storedCell[8] === 'O') ||
      (storedCell[1] === 'O' && storedCell[4] === 'O' && storedCell[7] === 'O') ||
      (storedCell[2] === 'O' && storedCell[4] === 'O' && storedCell[6] === 'O') ||
      (storedCell[2] === 'O' && storedCell[5] === 'O' && storedCell[8] === 'O') ||
      (storedCell[3] === 'O' && storedCell[4] === 'O' && storedCell[5] === 'O') ||
      (storedCell[6] === 'O' && storedCell[7] === 'O' && storedCell[8] === 'O')) {
        moveNum = 0
        store.game.over = true
        currentPlayer = 'X'
        return ui.onWinner('O Wins!')
      }
    }
    checkForWin()
    console.log(store.game.cells)
    console.log(store.game)
    // }))
    console.log(moveNum)
    if (moveNum === 9) {
      moveNum = 0
      currentPlayer = 'X'
      store.game.over = true
      return ui.onDraw("It's a tie")
    }
    if (store.game.over === true) {
      store.game = {}
      // return ui.onGameFinish('Click start over to play again!')
    }
    // console.log($.inArray('X', store.game.cells))
  }
  putValue()
  // console.log(clickOnGrid)
}

const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
  $('.newGame').on('click', onNewGame)
}

module.exports = {
  addHandlers
}
