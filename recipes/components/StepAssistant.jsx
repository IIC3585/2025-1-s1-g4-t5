import React, { useState, useEffect } from 'react';

const Timer = ({ minutes }) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSecondsLeft(minutes * 60);
    setIsActive(false);
  }

  const displayTime = `${Math.floor(secondsLeft / 60)}m ${secondsLeft % 60}s`;

  return (
    <span className="timer-span">
      <button onClick={toggle} className="timer-button">{isActive ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={reset} className="timer-button">Reset</button>
      <strong className="timer-display">{displayTime}</strong>
    </span>
  );
};

const StepAssistant = ({ instructions }) => {
  const steps = instructions.split('\n').filter(step => step.trim() !== '');

  const timeRegex = /(\d+)\s+(minute|minutes|hour|hours)/;

  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      {steps.map((step, index) => {
        const match = step.match(timeRegex);
        if (match) {
          let minutes = parseInt(match[1], 10);
          if (match[2].startsWith('hour')) {
            minutes *= 60;
          }
          return <p key={index}>{step} <Timer minutes={minutes} /></p>;
        }
        return <p key={index}>{step}</p>;
      })}
    </div>
  );
};

export default StepAssistant;