import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './BalloonGame.css';

const MISS_LIMIT = 50;
const SPEED_STEP_INTERVAL = 15; // seconds
const BREAK_REMINDER_SECONDS = 300;
const BALLOON_LIMIT = 16;
const BALLOON_COLORS = [
  '#FF6B6B',
  '#FF8E72',
  '#FFD166',
  '#4ECDC4',
  '#06D6A0',
  '#6C63FF',
  '#9C89B8',
];

const SPEED_STEPS = [
  { spawnInterval: 1600, minDuration: 9.5, maxDuration: 12.5 },
  { spawnInterval: 1200, minDuration: 7.2, maxDuration: 9.5 },
  { spawnInterval: 900, minDuration: 5.5, maxDuration: 7.2 },
  { spawnInterval: 700, minDuration: 4.4, maxDuration: 6.2 },
];

function resolveSpeedSettings(speedLevel) {
  if (speedLevel < SPEED_STEPS.length) {
    return SPEED_STEPS[speedLevel];
  }

  const lastStep = SPEED_STEPS[SPEED_STEPS.length - 1];
  const extra = speedLevel - (SPEED_STEPS.length - 1);
  const spawnInterval = Math.max(320, lastStep.spawnInterval - extra * 70);
  const minDuration = Math.max(2.6, lastStep.minDuration - extra * 0.35);
  const maxDuration = Math.max(3.2, lastStep.maxDuration - extra * 0.35);

  return { spawnInterval, minDuration, maxDuration };
}

function createBalloon({ minDuration, maxDuration }) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const size = Math.random() * 40 + 60;
  const duration = Math.random() * (maxDuration - minDuration) + minDuration;
  const sway = Math.random() * 40 - 20;
  const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
  const left = Math.random() * 70 + 5;

  return { id, size, duration, sway, color, left };
}

function BalloonGame() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [popped, setPopped] = useState(0);
  const [missed, setMissed] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [gameCycle, setGameCycle] = useState(0);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [hasShownBreakReminder, setHasShownBreakReminder] = useState(false);

  const gameActive = missed < MISS_LIMIT;
  const speedLevel = useMemo(() => Math.floor(elapsedSeconds / SPEED_STEP_INTERVAL), [elapsedSeconds]);
  const speedSettings = useMemo(() => resolveSpeedSettings(speedLevel), [speedLevel]);
  const isPlaying = gameActive && !showBreakModal;

  useEffect(() => {
    if (!gameActive && missed >= MISS_LIMIT && !hasShownBreakReminder) {
      setShowBreakModal(true);
      setHasShownBreakReminder(true);
    }
  }, [gameActive, missed, hasShownBreakReminder]);

  useEffect(() => {
    if (!hasShownBreakReminder && elapsedSeconds >= BREAK_REMINDER_SECONDS && isPlaying) {
      setShowBreakModal(true);
      setHasShownBreakReminder(true);
    }
  }, [elapsedSeconds, hasShownBreakReminder, isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const interval = setInterval(() => {
      setBalloons(prev => {
        const next = prev.length >= BALLOON_LIMIT ? prev.slice(prev.length - BALLOON_LIMIT + 1) : prev;
        return [...next, createBalloon(speedSettings)];
      });
    }, speedSettings.spawnInterval);

    return () => clearInterval(interval);
  }, [isPlaying, speedSettings, gameCycle]);

  useEffect(() => {
    if (!isPlaying) {
      setBalloons([]);
    }
  }, [isPlaying]);

  const popBalloon = useCallback(
    (id) => {
      if (!isPlaying) {
        return;
      }

      setBalloons(prev => prev.filter(balloon => balloon.id !== id));
      setScore(prev => prev + 10);
      setPopped(prev => prev + 1);
    },
    [isPlaying],
  );

  const handleMissed = useCallback(
    (id) => {
      if (!gameActive || !isPlaying) {
        return;
      }

      setBalloons(prev => {
        const next = prev.filter(balloon => balloon.id !== id);

        if (next.length === prev.length) {
          return next;
        }

        setMissed(prevMissed => prevMissed + 1);
        return next;
      });
    },
    [gameActive, isPlaying],
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setPopped(0);
    setMissed(0);
    setElapsedSeconds(0);
    setBalloons([]);
    setGameCycle(prev => prev + 1);
    setShowBreakModal(false);
    setHasShownBreakReminder(false);
  }, []);

  const accuracy = useMemo(() => {
    const total = popped + missed;
    if (total === 0) {
      return 100;
    }
    return Math.round((popped / total) * 100);
  }, [popped, missed]);

  const missProgress = useMemo(() => Math.min(100, (missed / MISS_LIMIT) * 100), [missed]);
  const displaySpeedLevel = useMemo(() => speedLevel + 1, [speedLevel]);
  const missesRemaining = Math.max(0, MISS_LIMIT - missed);
  const nextSpeedUpIn = useMemo(() => {
    if (!isPlaying) {
      return null;
    }
    const remainder = elapsedSeconds % SPEED_STEP_INTERVAL;
    return remainder === 0 ? SPEED_STEP_INTERVAL : SPEED_STEP_INTERVAL - remainder;
  }, [elapsedSeconds, isPlaying]);
  const canRestartNow = !showBreakModal;

  return (
    <div className="balloon-game">
      <div className="balloon-game__content">
        <aside className="balloon-game__panel">
          <h1 className="balloon-game__title">Balloon Pop Challenge</h1>
          <p className="balloon-game__subtitle">
            Pop balloons for as long as you can. The pace increases every {SPEED_STEP_INTERVAL} seconds and the run ends after {MISS_LIMIT} misses, so stay sharp!
          </p>

          <div className="balloon-game__score">
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>
            <div>
              <span>Popped</span>
              <strong>{popped}</strong>
            </div>
            <div>
              <span>Missed</span>
              <strong>{missed}</strong>
            </div>
          </div>

          <div className="balloon-game__miss-progress" aria-label={`Miss tracker ${missed} of ${MISS_LIMIT}`}>
            <div className="balloon-game__miss-progress-header">
              <span>Misses</span>
              <strong>{missed}/{MISS_LIMIT}</strong>
            </div>
            <div className="balloon-game__timer">
              <div className="balloon-game__timer-bar" style={{ width: `${missProgress}%` }} />
            </div>
          </div>

          <div className="balloon-game__meta">
            <div className="balloon-game__meta-item">
              <span className="balloon-game__meta-label">Speed level</span>
              <span className="balloon-game__meta-value">{displaySpeedLevel}</span>
            </div>
            <div className="balloon-game__meta-item">
              <span className="balloon-game__meta-label">Next speed up</span>
              <span className="balloon-game__meta-value">{isPlaying && nextSpeedUpIn !== null ? `${nextSpeedUpIn}s` : '--'}</span>
            </div>
            <div className="balloon-game__meta-item">
              <span className="balloon-game__meta-label">Time survived</span>
              <span className="balloon-game__meta-value">{elapsedSeconds}s</span>
            </div>
            <div className="balloon-game__meta-item">
              <span className="balloon-game__meta-label">Misses left</span>
              <span className="balloon-game__meta-value">{missesRemaining}</span>
            </div>
          </div>

          <button
            type="button"
            className="balloon-game__button"
            onClick={resetGame}
            disabled={!canRestartNow}
          >
            {gameActive ? 'Restart' : 'Play again'}
          </button>
        </aside>

        <section className="balloon-game__playfield" aria-live="polite">
          {balloons.map(balloon => (
            <button
              key={balloon.id}
              type="button"
              className="balloon-game__balloon"
              style={{
                left: `${balloon.left}%`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.35}px`,
                background: `radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.85), ${balloon.color})`,
                '--duration': `${balloon.duration}s`,
                '--sway-distance': `${balloon.sway}px`,
              }}
              onClick={() => popBalloon(balloon.id)}
              onAnimationEnd={() => handleMissed(balloon.id)}
            >
              <span className="balloon-game__shine" aria-hidden="true" />
              <span className="balloon-game__string" aria-hidden="true" />
            </button>
          ))}

          {!gameActive && (
            <div className="balloon-game__overlay">
              <h2>Game over</h2>
              <p>You scored {score} points.</p>
              <p>
                {popped} popped | {missed} missed | Accuracy {accuracy}%
              </p>
              <p>Survived for {elapsedSeconds} seconds.</p>
              {!showBreakModal && (
                <button type="button" className="balloon-game__overlay-button" onClick={resetGame}>
                  Play again
                </button>
              )}
            </div>
          )}

          {showBreakModal && (
            <div className="balloon-game__break-modal" role="dialog" aria-modal="true" aria-labelledby="balloon-break-heading">
              <div className="balloon-game__break-card">
                <h3 id="balloon-break-heading">Break Over</h3>
                <p className="balloon-game__break-subtitle">Time to focus on Work now</p>
                <p className="balloon-game__break-note">Play again with your Next Break after 90 Minutes</p>
                <button type="button" className="balloon-game__break-button" onClick={() => setShowBreakModal(false)}>
                  Got it
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default BalloonGame;
