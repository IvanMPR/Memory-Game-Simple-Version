import {
  timeDisplay,
  helperObject,
  hits,
  misses,
  memoryCardsEasy,
} from '../app.js';
import { openModal } from './modal.js';

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

export function displayPastTime(el) {
  const [hours, minutes, seconds] = el.split(':');

  if (+hours === 0 && +seconds === 0) {
    return `${+minutes} ${+minutes === 1 ? 'minute' : 'minutes'}`;
  }
  if (+hours === 0) {
    return `${+minutes} ${
      +minutes === 1 ? 'minute' : 'minutes'
    } and ${+seconds} ${+seconds === 1 ? 'second' : 'seconds'}`;
  }

  if (+hours !== 0) {
    return `${+hours} ${+hours === 1 ? 'hour' : 'hours'}, ${+minutes} ${
      +minutes === 1 ? 'minute' : 'minutes'
    } and ${+seconds} ${+seconds === 1 ? 'second' : 'seconds'}`;
  }
}
