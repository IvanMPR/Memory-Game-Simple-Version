import {
  modalWindow,
  modalBackground,
  timeDisplay,
  helperObject,
} from '../app.js';
import { displayPastTime } from './model.js';
export function openModal() {
  const string = `
  <h2>CONGRATULATIONS !</h2>
  <p>You have finished the game in ${displayPastTime(timeDisplay.textContent)},
  with ${helperObject.counterPos + helperObject.counterNeg} attempts in total !
  </p>
  `;
  modalWindow.insertAdjacentHTML('afterbegin', string);

  modalBackground.classList.remove('modal-closed');
  modalBackground.classList.add('modal-open');
}

export function closeModal() {
  modalBackground.classList.remove('modal-open');
  modalBackground.classList.add('modal-closed');
  location.reload();
}
