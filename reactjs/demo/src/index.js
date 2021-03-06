import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'



// class Square extends React.Component {
//   render(props) {
//     return (
//       <button
//         className = "square"
//         onClick={() => { this.props.onClick() } }
//       >
//         { this.props.value }
//       </button>
//     )
//   }
// }

function Square (props) {
  return (
    <button
      className = "square"
      onClick = { props.onClick }
    >
      { props.value }
    </button>
  )
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props) // required in constructor
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true
  //   }
  // }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value = { this.props.value.squares[i] }
        onClick = { () => this.props.onClick(i) }
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props) // required in constructor
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  goJump(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0
    })
  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1)
    let squares = history[history.length - 1].squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    let xIsNext = this.state.xIsNext
    squares[i] = xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !xIsNext
    })
  }

  render() {
    const history = this.state.history
    let current = {
      squares: history[this.state.stepNumber].squares
    }
    const moves = history.map((step, move) => {
      let desc = move ? "Go to move #" + move : "Go to game start"
      return (
        <li key={move}>
          <button onClick={() => this.goJump(move)}>{desc}</button>
        </li>
      )
    })

    let status
    let winnter = calculateWinner(current.squares)
    if (winnter) {
      status = "winnter: " + winnter
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "Y")
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board value = { current } onClick={ (i) => {this.handleClick(i)} } />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
