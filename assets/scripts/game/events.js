'use strict'
// const ui = require('./ui')

const emptyBoard = ['', '', '', '', '', '', '', '', '']
for (let i = 0; i < emptyBoard.length; i++) {
  if (i % 2 === 0) {
    // console.log('current player is X')
  } else {
    // console.log('current player is O')
  }
}

// listen for click, push X or O only if there's no string inside.
const onPlayMove = event => {
  // const value = () => {
  //   // let currentValue
  // for (let i = 1; i <= emptyBoard.length; i++) {
  //   console.log(i)
  // if (i % 2 === 0) {
  //   currentValue = 'O'
  // } else if (i % 2 === 1) {
  //   currentValue = 'X'
  // }
  // return currentValue
  // }
  const clickOnGrid = event.target // return id of grid when clicked.
  const putValue = () => {
    $(clickOnGrid).html('X')
  }
  return putValue()
}
// console.log(clickOnGrid)
// for (let i = 0; i < gameBoard.legnth; i++) {
// if (gameBoard[i] === '') {
//   gameBoard.push('X')
// }

const addHandlers = event => {
  $('.game-table').on('click', onPlayMove)
}

module.exports = {
  addHandlers
}
