import {
  timeDisplay,
  helperObject,
  hits,
  misses,
  memoryCardsEasy,
  openModal,
} from '../app.js';

export const startTimer = function () {
  let startPoint = 1;
  let hoursCount = 0;
  const timer = setInterval(() => {
    const seconds = String(Math.trunc(startPoint % 60)).padStart(2, 0);
    const minutes = String(Math.trunc(startPoint / 60)).padStart(2, 0);
    const hours = String(hoursCount).padStart(2, 0);
    if (startPoint === 3600) {
      hoursCount <= 22 ? hoursCount++ : (hoursCount = 0);
      startPoint = 1;
    }
    timeDisplay.textContent = `${hours} : ${minutes} : ${seconds}`;
    startPoint++;
    // Stop timer on level end
    if (+helperObject.counterPos === memoryCardsEasy.length / 2) {
      clearInterval(timer);
      openModal();
    }
  }, 1000);
  return timer;
};

export const addPlus = function () {
  helperObject.counterPos++;
  return (hits.textContent = String(helperObject.counterPos).padStart(2, 0));
};

export const addMinus = function () {
  helperObject.counterNeg++;
  return (misses.textContent = String(helperObject.counterNeg).padStart(2, 0));
};
