// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect the bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winning
// 7. Play Agian

const prompt = require("prompt-sync")(); //to access the prompt

// ASSIGNING THE ROW COLUMN AND SYMBOLS VALUES:
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//GETTING THE INPUT FROM THE USER USING PROMPT:

//Deposit Amount:
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invaild deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

//Number of Lines to Bet On:
const getNumberOdLines = () => {
  while (true) {
    const lines = prompt("Enter the number of line to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid Line Number, try again");
    } else {
      return numberOfLines;
    }
  }
};

//bet Amount Per Line:
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again");
    } else {
      return numberBet;
    }
  }
};
//Spin the Wheel:
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  //Push the values in reels:
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]; //Copied all the symbols to reelsSym bols
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length); //getting random index
      const selectedSymbols = reelSymbols[randomIndex]; //Selected Symbols using Index
      reels[i].push(selectedSymbols);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

//Transpose the reels for better view and visual:
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

//Print the transpose view:
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

//Winning Data:
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

// Overall Game in One Function:
const game = () => {
  let balance = deposit();

  while (true) {
    console.log(`You have a Balance of$${balance}`);
    const numberOfLines = getNumberOdLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log(`You won, $${winnings.toString()}`);

    if (balance <= 0) {
      console.log(`You ran out of money!`);
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n) ?");

    if (playAgain != "y") break;
  }
};

//Calling the Game:
game();
