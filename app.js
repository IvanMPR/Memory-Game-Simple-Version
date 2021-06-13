import { flipSound, pairHit, errorTone, pairMiss } from './modules/audio.js';
//prettier-ignore
import {  startTimer, addPlus,  addMinus } from './modules/model.js';

import { closeModal } from './modules/modal.js';

const cardFields = document.querySelectorAll('.gamefields');
const cardsContainer = document.querySelector('.cards-container');
export const timeDisplay = document.querySelector('.time-display');
const button = document.querySelector('.btn');
export const hits = document.querySelector('.stats-current-hits-info');
export const misses = document.querySelector('.stats-current-misses-info');
export const modalBackground = document.querySelector('.modal-background');
export const modalWindow = document.querySelector('.modal-window');
const buttonModal = document.querySelector('.close-window');
export const time = document.querySelector('.time-display');
const statsContainer = document.querySelector('.stats-container');
export const memoryCardsEasy = [
  'pattern',
  'pattern',
  'shutter',
  'shutter',
  'compass',
  'compass',
  'social',
  'social',
  'target',
  'target',
  'envelope',
  'envelope',
  'camera',
  'camera',
  'barcode',
  'barcode',
];

// Knuth-Yates shuffle function. Borrowed code ! Shuffles cards on start of the level
const shuffle = function (array) {
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
};
// helperObject stores temporary information for comparing guesses
export const helperObject = {
  counterPos: 0,
  counterNeg: 0,
  guesses: [],
  id: [],
};

window.addEventListener('load', function () {
  // getCurrentLevel();
  shuffle(memoryCardsEasy);
  cardFields.forEach((field, i) => {
    field.style.backgroundImage = `url(memory_cards/easy/${memoryCardsEasy[i]}.jpg)`;
    field.classList.add('hidden');
  });
});

// First listener on cardsContainer. Checks if e.target is correct and pushes two attributes to helperObject
cardsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('gamefields')) return;
  console.log(e.target.id);
  flipSound();
  e.target.classList.toggle('hidden');
  helperObject.guesses.push(e.target.style.backgroundImage);
  helperObject.id.push(e.target.id);
});

// Second listener on cardsContainer prevents double click on opened card and determines whether the guess is true or false
cardsContainer.addEventListener('click', function () {
  if (helperObject.guesses.length !== 2) return;
  //  Below IF Block prevents clicking on opened card
  if (helperObject.id[0] === helperObject.id[1]) {
    document.getElementById(`${helperObject.id[0]}`).classList.add('hidden');
    helperObject.guesses = [];
    helperObject.id = [];
    errorTone();
    setTimeout(() => {
      alert('Please Click On Two Different Cards !');
    }, 100);
    return;
  }
  // Below IF block closes cards if they are not the same
  if (helperObject.guesses[0] !== helperObject.guesses[1]) {
    cardsContainer.style.pointerEvents = 'none';
    setTimeout(() => {
      document
        .getElementById(`${helperObject.id[0]}`)
        .classList.toggle('hidden');

      document
        .getElementById(`${helperObject.id[1]}`)
        .classList.toggle('hidden');

      pairMiss();
      addMinus();
      helperObject.guesses = [];
      helperObject.id = [];
      cardsContainer.style.pointerEvents = 'initial';
    }, 1500);
    // Else block from below handles true guess
  } else {
    cardsContainer.style.pointerEvents = 'none';
    setTimeout(() => {
      document.getElementById(`${helperObject.id[0]}`).style.visibility =
        'hidden';
      document
        .getElementById(`${helperObject.id[0]}`)
        .closest('.gf-wrapper').style.visibility = 'hidden';
      document.getElementById(`${helperObject.id[1]}`).style.visibility =
        'hidden';
      document
        .getElementById(`${helperObject.id[1]}`)
        .closest('.gf-wrapper').style.visibility = 'hidden';
      pairHit();
      addPlus();
      helperObject.guesses = [];
      helperObject.id = [];
      cardsContainer.style.pointerEvents = 'initial';
    }, 1500);
  }
});

button.addEventListener('click', function () {
  startTimer();
  button.style.display = 'none';
  statsContainer.classList.remove('pushed-below');
  statsContainer.classList.add('normal-position');
});

buttonModal.addEventListener('click', closeModal);

modalBackground.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-open')) closeModal();
});
