// /utils/sudokuLogic.js

// Function to check if a number is valid in a given position
const isValid = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }
  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }
  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }
  return true;
};

// Backtracking algorithm to solve/fill the Sudoku board
const solveSudoku = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle numbers for randomness in generation
        for (let k = nums.length - 1; k > 0; k--) {
            const l = Math.floor(Math.random() * (k + 1));
            [nums[k], nums[l]] = [nums[l], nums[k]];
        }
        for (let num of nums) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num;
            if (solveSudoku(board)) {
              return true;
            } else {
              board[i][j] = null; // Backtrack
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Main function to generate a Sudoku puzzle
export const generateSudoku = (difficulty) => {
  // 1. Create an empty 9x9 board
  const solution = Array(9).fill(null).map(() => Array(9).fill(null));

  // 2. Fill the board completely using the backtracking solver
  solveSudoku(solution);

  // 3. Create a copy of the solution to be the puzzle
  const puzzle = solution.map(row => [...row]);

  // 4. "Poke holes" in the puzzle by removing numbers
  let empties;
  switch (difficulty) {
    case 'easy':
      empties = 40;
      break;
    case 'medium':
      empties = 50;
      break;
    case 'hard':
      empties = 60;
      break;
    default:
      empties = 50;
  }

  let removed = 0;
  while (removed < empties) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      removed++;
    }
  }

  return { puzzle, solution };
};