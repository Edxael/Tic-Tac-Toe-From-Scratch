import React, { Component } from 'react'
import Logo from '../Img/logo.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../Css/game.css'

// Components and Docs location:  https://reactstrap.github.io/  
class Game extends Component {
  state = {
    game: [['', '', ''], ['', '', ''], ['', '', '']],
    currentChar: 'X',
    gameResults: {},
    modalTex: '',
    modal: false
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  check4Win = (game) => {
    console.log('Checking 4 Win: ', game)
    return new Promise((resolve, reject) => {
      for (let idx = 0; idx <= game.length - 1; idx++) {

        // ==============================================================================
        if (game[idx].every((x) => { return x === game[idx][0] && (x !== '') })) {                     // Check for Horizontal wins
          resolve({ win: true, player: game[idx][0], type: 'Horizontal' })
        } else if ((game[0][idx] === game[1][idx]) && (game[0][idx] === game[2][idx]) && (game[0][idx] !== '')) {  // Check for Vertical wins
          resolve({ win: true, player: game[0][idx], type: 'Vertical' })
        } else if ((game[0][0] === game[1][1]) && (game[0][0] === game[2][2]) && (game[0][0] !== '')) {          // Check for Up-X wins
          resolve({ win: true, player: game[0][0], type: 'Up-X' })
        } else if ((game[0][2] === game[1][1]) && (game[0][2] === game[2][0]) && (game[0][2] !== '')) {          // Check for Down-X wins
          resolve({ win: true, player: game[0][2], type: 'Down-X' })
        }
        // ==============================================================================
      }
      resolve({ win: false, player: '', type: 'None' })                 // No Win
    })
  }

  fillBox = (row, box) => {
    console.log(`Row: ${row}, Box: ${box}`)

    if (this.state.gameResults.win) {
      // alert(`Game-over Winer is: "${(this.state.currentChar === 'X') ? 'O' : 'X'}"  Click new game to play again.`)
      this.setState({ modalTex: `Game-over Winer is: "${(this.state.currentChar === 'X') ? 'O' : 'X'}"  Click new game to play again.`, modal: true })
    } else if (this.state.game[row][box] !== '') {
      // alert('This block is taken please chose other')
      this.setState({ modalTex: 'This block is taken please chose other', modal: true })
    } else {
      let move = this.state.game
      move[row][box] = this.state.currentChar
      this.setState({ game: move, currentChar: (this.state.currentChar === 'X') ? 'O' : 'X' }, () => {
        this.check4Win(this.state.game)
          .then((gameResult) => {
            console.log("The result is: ", gameResult)
            if (gameResult.win) {
              this.setState({ gameResults: gameResult })
              setTimeout(() => {
                // alert(`Game-over Winer is: "${(this.state.currentChar === 'X') ? 'O' : 'X'}"  Click new game to play again.`)
                this.setState({ modalTex: `Game-over Winer is: "${(this.state.currentChar === 'X') ? 'O' : 'X'}"  Click new game to play again.`, modal: true })
              }, 100)
            }
          })
      })
    }
  }

  // newGame = () => {
  //   this.setState({
  //     game: [['', '', ''], ['', '', ''], ['', '', '']],
  //     currentChar: 'X',
  //     gameResults: {}
  //   })
  // }

  render() {
    return (
      <div id="main-game-container">

        <div id="center-game-container">


          <img id="logo-img" src={require(`../Img/logo.png`)} alt="" />
          <br />
          <img id="App-logo" src={require(`../Img/react-hexagon.png`)} alt="logo" />

          <div id="game-grid-box">
            {
              this.state.game.map((row, idxr) => {
                return (
                  <div key={idxr} className="game-grid-row">
                    {row.map((box, idxb) => {
                      return (
                        <div key={idxb} onClick={() => { this.fillBox(idxr, idxb) }} className="game-grid-componet">{box}</div>
                      )
                    })}
                  </div>
                )
              })
            }
          </div>

          <br /><br />

          <button id="btn-new-game" onClick={this.newGame}>New Game</button>
          <hr />
          <p>By: Edmundo Rubio</p>

          <div>
            <Button color="danger" onClick={() => { this.setState({ modal: !this.state.modal }) }}>{'Open Modal'}</Button>
            <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }} className={'one'}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                {this.state.modalTex}
            </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => { this.setState({ modal: !this.state.modal }) }}>Do Something</Button>{' '}
                <Button color="secondary" onClick={() => { this.setState({ modal: !this.state.modal }) }}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>

        </div>

      </div>
    )
  }
}

export default Game
