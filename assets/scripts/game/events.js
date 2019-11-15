'use strict'
// const ui = require('./ui')
// const currentPlayer = 'X'

// const emptyBoard = ['', '', '', '', '', '', '', '', '']

// assign grid to emptyBoard[i]
// push player.player_x or player.player_o to emptyBoard[i] by clicking on a grid

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
}
// check for winner
// const checkForWinner = () => {
//
// }

const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
}

module.exports = {
  addHandlers
}

//
// Spencer's idea:
// assign id's 0 to 8 to html grid, get a click to pull up id by event.click.id
// and turn it into integer with jquery. push it up using emptyBoard[i]
//
// Derek's:
// let current payer be true.
// using if statement and !currentPlayer, proceed or not.
//
// Tory's:
// currentPlayer='X
//
