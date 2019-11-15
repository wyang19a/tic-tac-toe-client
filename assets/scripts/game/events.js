'use strict'
// const ui = require('./ui')
// const currentPlayer = 'X'

// const emptyBoard = ['', '', '', '', '', '', '', '', '']

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
  const putValue = () => {
    // if there is no value inside clicked box, run toggleTurn() and pass in currentPlayer
    if (clickOnGrid.html() === '') {
      clickOnGrid.html(currentPlayer, toggleTurn())
      // else, if there's any html, do nothing and just console log for now.
    } else {
      console.log('already selected')
    }
  }
  putValue()
  console.log(clickOnGrid)
}
// let winner = true
// const checkForWinner = () => {
//   if ()
// }
// check for winner
// winning combinations
// 0 1 2
// 0 3 6
// 0 4 8
// 1 4 7
// 2 4 6
// 2 5 8
// 3 4 5
// 6 7 8

// checForWin should be done after each click
// if combination matches, games stops
//

const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
}

module.exports = {
  addHandlers
}
