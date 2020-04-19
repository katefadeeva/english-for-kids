// import {cards} from './cards.js';
import {createContainer} from './container.js';


createContainer();
let randomSounds = [];
let currentSoundIndex = 0;
let errorCount = 0;
let app = {
  mode: 'train',
  isGameStarted: false
}
let cardState = {
  isRotated: false
}
const cardsNodeList = document.querySelectorAll('.card');

document.querySelectorAll('a.menu__item').forEach(item => {
  if(item.innerHTML === document.querySelector('h1').innerHTML) {
    item.classList.add('item-link');
  }
})

document.querySelector('#menu__toggle').addEventListener('click', function() {
  if (document.getElementById('menu__toggle').checked === true) {
    document.querySelector('body').style.overflow = 'hidden';
  }
  if (document.getElementById('menu__toggle').checked === false) {
    document.querySelector('body').style.overflow = 'visible';
  }
});

// переворот карты
document.querySelectorAll('.rotate').forEach((item, index) => {
  item.addEventListener('click', event => {
    cardState.isRotated = true;
    cardsNodeList[index].classList.add('translate');
  });  
});


// события при клике на карту и при отведении мыши с карты
cardsNodeList.forEach((item, index) => {
  item.addEventListener('mouseleave', function (event) {
    cardState.isRotated = false;
    item.classList.remove('translate');
  });

  item.addEventListener('click', function (e) { 
    const cardSound = document.querySelectorAll('.audio')[index].src;
    if (app.mode === 'train' && !cardState.isRotated) {
      playSound(cardSound);
    };

    if (app.mode === 'play' && app.isGameStarted) {
      if(cardSound === randomSounds[currentSoundIndex]) {
        document.querySelectorAll('.front')[index].classList.add('inactive');
        const star = document.createElement('div');
        star.classList.add('star-succes');
        document.querySelector('.rating').appendChild(star);
        document.querySelector('.soundEffects').src = '../assets/audio/correct.mp3';
        document.querySelector('.soundEffects').autoplay = true;
        e.preventDefault();
        currentSoundIndex++;
        if (currentSoundIndex === cardsNodeList.length) {
          localStorage.setItem('error', errorCount);
          setTimeout(() => window.location.href = '../total.html', 1500);
          errorCount = 0;
          return;
        }
        setTimeout(playSound, 1000, randomSounds[currentSoundIndex]);
      } else {
        const star = document.createElement('div');
        star.classList.add('star-error');
      
        errorCount++;

        document.querySelector('.rating').appendChild(star);
        document.querySelector('.soundEffects').src = '../assets/audio/error.mp3';
        document.querySelector('.soundEffects').autoplay = true;
      }
    }
  });
});

// переход в режим Игры
document.querySelector('.switch-input').addEventListener('change', function () {
  if (!this.checked) {
    app.mode = 'play';
    document.querySelector('h1').classList.remove('green');
    document.querySelectorAll('.audio').forEach(item => randomSounds.push(item.src));
    shuffle(randomSounds);
    document.querySelector('.navigation').classList.remove('green');
    cardsNodeList.forEach(item => item.classList.add('card-cover'));
    document.querySelectorAll('.rotate').forEach(item => item.classList.add('none'));
    document.querySelectorAll('.card-header').forEach(item => item.classList.add('none'));
    document.querySelector('.btn').classList.remove('none');
  } else {
    randomSounds = [];
    app.mode = 'train';
    app.isGameStarted = false;
    document.querySelector('h1').classList.add('green');
    document.querySelector('.navigation').classList.add('green');
    cardsNodeList.forEach(item => item.classList.remove('card-cover'));
    document.querySelectorAll('.rotate').forEach(item => item.classList.remove('none'));
    document.querySelectorAll('.card-header').forEach(item => item.classList.remove('none'));
    document.querySelector('.btn').classList.add('none');
  }
});

// функция для перетасовки массива
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
};

function playSound(soundSrc) {
  const audio = new Audio();
  audio.src = soundSrc; // randomSounds[currentSoundIndex]; // Указываем путь к звуку "клика"
  audio.autoplay = true;
}

// события при клике на Start Game
document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('.btn').classList.add('repeat');
  app.isGameStarted = true;
  setTimeout(playSound, 500, randomSounds[currentSoundIndex]);
  document.querySelector('.rating').classList.remove('none');
});






