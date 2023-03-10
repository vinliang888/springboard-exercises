const startButton = document.querySelector("#start-game-button");
const newGameForm = document.querySelector('#new-game-form');
const player1Color = document.querySelector('#player-1-color');
const player2Color = document.querySelector('#player-2-color');



class Player {
  constructor(color, number) {
    if(this.checkColor(color)) {
      this.color = color;
      this.number = number;
    } else {
      alert('Invalid color name!');
      throw new Error('Invalid color name!');
    }
  }

  checkColor(str) {
    // check regex for hex color
    let reg = /^#([0-9A-F]{3}){1,2}$/i;
    if (reg.test(str)) {
      return true;
    }
    var s = new Option().style;
    s.color = str;
    return s.color == str;

  }
}


class Game {
  constructor(width, height) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.board = [];
    this.gameComplete = false;
    this.gameTied = false;
    this.playerList = [];
    this.playerList.push(new Player(player1Color.value, 1));
    this.playerList.push(new Player(player2Color.value, 2));
    this.currPlayer = this.playerList[0];

    this.makeBoard();
    this.makeHtmlBoard();
    newGameForm.addEventListener('submit', this.resetBoard.bind(this));

  }

  resetBoard(e) {
    e.preventDefault();
    const board = document.getElementById('board');
    board.innerHTML = '';
    new Game(6,7);
  }

  makeBoard() {
    const { board, HEIGHT, WIDTH } = this;
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
    }
  }

  makeHtmlBoard() {
    const { HEIGHT, WIDTH} = this;
    const board = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');


    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      headCell.addEventListener('click', this.handleClick.bind(this));
      top.append(headCell);
      
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    const { board, HEIGHT } = this;
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
  }

  handleClick(evt) {
    let { board, playerList, currPlayer, gameComplete, gameTied, findSpotForCol, placeInTable, endGame, checkForWin } = this;
    // get x from ID of clicked cell
    const x = +evt.target.id;

    if (gameComplete) {
      return gameTied ? endGame.call(this, `Tie!`) : endGame.call(this, `Player ${currPlayer.number} won!`);
    }
  
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol.call(this,x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable.call(this,y, x);
    
    // check for win
    if (checkForWin.call(this)) {
      this.gameComplete = true;
      startButton.value = "Start New Game"
      return endGame.call(this, `Player ${currPlayer.number} won!`);
    }
    
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      this.gameComplete = true;
      this.gameTied = true;
      startButton.value = "Start New Game"
      return endGame.call(this,'Tie!');
    }
      
    // switch players
    // why does this require a 'this' here?
    this.currPlayer = currPlayer === playerList[0] ? playerList[1] : playerList[0];
  }

  checkForWin() {
    
    const {WIDTH, HEIGHT, board, currPlayer } = this;
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}


newGameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  new Game(6,7);
  startButton.value = "Reset Game"
});