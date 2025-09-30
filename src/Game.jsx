import React from 'react';

function Game() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Left Side Column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-32 h-full bg-gradient-to-b from-blue-200 to-purple-200 rounded-r-3xl shadow-lg mr-4">
        <div className="text-4xl mb-4">🎮</div>
        <div className="text-blue-500 font-bold">Games</div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to the Game Zone!</h1>
        <p className="mb-6 text-gray-700 text-lg">Choose a game below to get started. More games coming soon!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Number Guess Card */}
          <a href="/game/number-guess" className="block bg-gradient-to-br from-green-100 to-blue-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">🔢</span>
              <h2 className="text-2xl font-semibold text-green-700 mb-2">Number Guess</h2>
              <p className="text-gray-600 mb-4">Try to guess the secret number between 1 and 100. Get hints after each guess!</p>
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-semibold">Play Now</span>
            </div>
          </a>
          {/* Sudoku Card */}
          <a href="/game/sudoku" className="block bg-gradient-to-br from-yellow-100 to-blue-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">🧩</span>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-2">Sudoku</h2>
              <p className="text-gray-600 mb-4">Fill the grid so every row, column, and 3x3 box contains 1-9. Choose your difficulty!</p>
              <span className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold">Play Now</span>
            </div>
          </a>
        </div>
      </div>

      {/* Right Side Column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-32 h-full bg-gradient-to-b from-purple-200 to-blue-200 rounded-l-3xl shadow-lg ml-4">
        <div className="text-4xl mb-4">🕹️</div>
        <div className="text-purple-500 font-bold">Fun Zone</div>
      </div>
    </div>
  );
}

export default Game;
