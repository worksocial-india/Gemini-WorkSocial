// ...existing code...
// /components/sudoku.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { generateSudoku } from '../utils/sudokuLogic';
import './sudoku.css'; // We'll create this CSS file next

// Analogue clock component (single definition)
function AnalogueClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const size = 120;
  const center = size / 2;
  const radius = size / 2 - 8;
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const hourAngle = ((hour + minute / 60) * 30) - 90;
  const minuteAngle = (minute * 6) - 90;
  const secondAngle = (second * 6) - 90;
  function getHand(angle, length, width, color) {
    const rad = (angle * Math.PI) / 180;
    return (
      <line
        x1={center}
        y1={center}
        x2={center + length * Math.cos(rad)}
        y2={center + length * Math.sin(rad)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shadow rounded-full bg-white">
      <circle cx={center} cy={center} r={radius} fill="#f3f4f6" stroke="#333" strokeWidth="4" />
      {/* Hour marks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = center + (radius - 8) * Math.cos(angle);
        const y1 = center + (radius - 8) * Math.sin(angle);
        const x2 = center + radius * Math.cos(angle);
        const y2 = center + radius * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2" />;
      })}
      {/* Hands */}
      {getHand(hourAngle, radius * 0.5, 5, '#333')}
      {getHand(minuteAngle, radius * 0.7, 3, '#2563eb')}
      {getHand(secondAngle, radius * 0.8, 2, '#e11d48')}
      {/* Center dot */}
      <circle cx={center} cy={center} r={5} fill="#333" />
    </svg>
  );
}

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [initialGrid, setInitialGrid] = useState(null);
  const [grid, setGrid] = useState(null);
  const [solution, setSolution] = useState(null);
  const [conflicts, setConflicts] = useState(new Set());
  const [activeCell, setActiveCell] = useState(null);

  // Generate a new puzzle when difficulty changes
  useEffect(() => {
    const { puzzle, solution: solved } = generateSudoku(difficulty);
    setInitialGrid(puzzle.map(row => [...row]));
    setGrid(puzzle.map(row => [...row]));
    setSolution(solved);
    setTimeLeft(300);
    setTimerActive(true);
  }, [difficulty]);

  // Countdown timer effect
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const checkForConflicts = useCallback((currentGrid, row, col, value) => {
    const newConflicts = new Set();
    const cellKey = (r, c) => `${r}-${c}`;

    if (!value) return newConflicts; // No conflict if cell is empty

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && currentGrid[row][c] === value) {
        newConflicts.add(cellKey(row, c));
        newConflicts.add(cellKey(row, col));
      }
    }
    // ...existing code for column, box, etc...
    return newConflicts;
  }, []);

// Sudoku input change handler
function handleInputChange(e, rowIndex, colIndex) {
  const value = e.target.value === '' ? null : Number(e.target.value);
  // Only allow numbers 1-9 or empty
  if (value !== null && (value < 1 || value > 9)) return;
  // Copy grid
  const newGrid = grid.map(row => [...row]);
  newGrid[rowIndex][colIndex] = value;
  setGrid(newGrid);
  // Check for conflicts
  const newConflicts = checkForConflicts(newGrid, rowIndex, colIndex, value);
  setConflicts(newConflicts);
}

// Sudoku solve handler
function handleSolve() {
  if (!solution) return;
  setGrid(solution.map(row => [...row]));
  setConflicts(new Set());
  if (!grid) {
    return <div>Loading puzzle... 🧩</div>;
  }

  return (
    <div className="sudoku-container">
      <div className="mb-6 w-full text-center">
        <div className="mb-2 text-lg font-bold text-red-600">
          {timeLeft > 0
            ? `Time left: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
            : '⏰ Time is up!'}
        </div>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 w-full">Your Daily Sudoku Break</h1>
        <h2 className="text-xl text-gray-700 mb-4 w-full">The perfect five-minute escape to reset your focus and have some fun.</h2>
        <div className="bg-blue-50 rounded-lg p-4 text-gray-800 w-full shadow">
          <p className="mb-2 font-semibold">Feeling overwhelmed or need a quick distraction? You've come to the right place! Sudoku is the simple, rewarding puzzle game loved by millions.</p>
          <p className="mb-2"> <span className="font-bold text-blue-600">A Relaxing Habit:</span> Just a few minutes with a puzzle can help you de-stress and refocus your mind. It's the perfect screen break that's actually good for you! Forget scrolling—solve something.</p>
          <p> <span className="font-bold text-blue-600">A Fun Brain Teaser:</span> Keep your mind sharp in the most enjoyable way possible. Every puzzle you solve is a small victory that boosts your confidence and problem-solving skills.</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="font-bold mr-2">Choose Difficulty:</span>
        <button
          className={`sudoku-controls-btn ${difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-l`}
          onClick={() => setDifficulty('easy')}
        >Easy</button>
        <button
          className={`sudoku-controls-btn ${difficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2`}
          onClick={() => setDifficulty('medium')}
        >Medium</button>
        <button
          className={`sudoku-controls-btn ${difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-r`}
          onClick={() => setDifficulty('hard')}
        >Hard</button>
      </div>
      <div className="w-full flex flex-col md:flex-row items-start justify-center">
        <div className="sudoku-grid">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const isInitial = initialGrid[rowIndex][colIndex] !== null;
              const isConflict = conflicts.has(`${rowIndex}-${colIndex}`);
              const isActive = activeCell && activeCell.row === rowIndex && activeCell.col === colIndex;

              const cellClasses = [
                'sudoku-cell',
                isInitial ? 'initial-cell' : '',
                isConflict ? 'conflict-cell' : '',
                isActive ? 'active-cell' : '',
                (rowIndex % 3 === 2 && rowIndex !== 8) ? 'border-bottom' : '',
                (colIndex % 3 === 2 && colIndex !== 8) ? 'border-right' : ''
              ].join(' ');

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  className={cellClasses}
                  value={cell === null ? '' : cell}
                  readOnly={isInitial}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
                  onBlur={() => setActiveCell(null)}
                  min="1"
                  max="9"
                />
              );
            })
          ))}
        </div>
        {/* Analogue Clock for desktop */}
        <div className="hidden md:flex flex-col items-center justify-center ml-8 mt-4">
          <AnalogueClock />
        </div>
      </div>
      <div className="sudoku-controls mb-12">
        <button onClick={handleSolve}>Solve Puzzle</button>
      </div>
    </div>
  );
}

export default Sudoku;