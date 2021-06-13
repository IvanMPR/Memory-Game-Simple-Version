export const flipSound = function () {
  const tone = new Audio(
    'memory_cards/sounds/369960__mischy__umblattern-kurz.wav'
  );
  return tone.play();
};

export const pairHit = function () {
  const tone = new Audio('memory_cards/sounds/528867__eponn__beep-5.wav');
  return tone.play();
};

export const errorTone = function () {
  const tone = new Audio(
    'memory_cards/sounds/344687__korground__error-sound.wav'
  );
  return tone.play();
};

export const pairMiss = function () {
  const tone = new Audio(
    'memory_cards/sounds/140773__qubodup__computer-beep-sfx-for-videogames.wav'
  );
  return tone.play();
};

export const startGame = function () {
  const tone = new Audio(
    'memory_cards/sounds/350872__cabled-mess__coin-c-01.wav'
  );
  return tone.play();
};
