import React, { useState, useEffect } from 'react';

// Number Guessing Game Subpage
function NumberGuess() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }
    setAttempts(attempts + 1);
    if (num === target) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries. Play again?`);
      setTarget(Math.floor(Math.random() * 100) + 1);
      setAttempts(0);
      setGuess('');
    } else if (num < target) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Number Guess Subpage</h1>
        <p className="mb-6 text-gray-700">{message}</p>
        <form onSubmit={handleGuess} className="flex flex-col items-center gap-4">
          <input
            type="number"
            min="1"
            max="100"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            className="border border-green-300 rounded px-4 py-2 w-32 text-center"
            placeholder="Your guess"
          />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold">Guess</button>
        </form>
        <p className="mt-4 text-sm text-gray-500">Attempts: {attempts}</p>
      </div>
    </div>
  );
}

export default NumberGuess;
