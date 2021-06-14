//prettier-ignore
import { timeDisplay, helperObject, hits, misses, cardsContainer, memoryCardsEasy } from '../app.js';
import { endGameTone } from './audio.js';
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
    // Stop timer, open modal and play end level sound
    if (+helperObject.counterPos === memoryCardsEasy.length / 2) {
      clearInterval(timer);
      openModal();
      endGameTone();
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
  // Handling the passed time interval into modal message text
  const [hours, minutes, seconds] = el.split(':');

  if (+hours === 0 && +seconds === 0) {
    return `${+minutes} ${+minutes === 1 ? 'minute' : 'minutes'}`;
  }

  if (+hours === 0 && +minutes === 0) {
    return `${+seconds} seconds`;
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

// Knuth-Yates shuffle function. ! Borrowed code ! Shuffles cards on start of the level
export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  //While there remain elements to shuffle...
  while (0 !== currentIndex) {
    //Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    //And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function resetHelperObject() {
  helperObject.guesses = [];
  helperObject.id = [];
  cardsContainer.style.pointerEvents = 'initial';
}

export function toggleHideShow(el, classList = 'hidden') {
  return document.getElementById(`${el}`).classList.toggle(`${classList}`);
}

export function addHiddenClass(el, classList = 'hidden') {
  return document.getElementById(`${el}`).classList.add(`${classList}`);
}
