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

document.querySelector('#menu__toggle').addEventListener('click', () => {
  document.querySelector('body').style.overflow = document.getElementById('menu__toggle').checked ? 'hidden' : 'visible';
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
      
      if (document.querySelectorAll('.front')[index].className === 'front inactive' ) {
        return false;
      }
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

function removeActiveStyle() {
  document.querySelector('h1').classList.remove('active');
  document.querySelectorAll('.audio').forEach(item => randomSounds.push(item.src));
  shuffle(randomSounds);
  document.querySelector('.navigation').classList.remove('active');
  cardsNodeList.forEach(item => item.classList.add('card-cover'));
  document.querySelectorAll('.rotate').forEach(item => item.classList.add('none'));
  document.querySelectorAll('.card-header').forEach(item => item.classList.add('none'));
  document.querySelector('.btn').classList.remove('none');
}

function addActiveStyle() {
  randomSounds = [];
  app.isGameStarted = false;
  document.querySelector('h1').classList.add('active');
  document.querySelector('.navigation').classList.add('active');
  cardsNodeList.forEach(item => item.classList.remove('card-cover'));
  document.querySelectorAll('.rotate').forEach(item => item.classList.remove('none'));
  document.querySelectorAll('.card-header').forEach(item => item.classList.remove('none'));
  document.querySelector('.btn').classList.add('none');
}

function updateSetsStyles() {
  if (app.mode === 'train') {
    document.querySelector('.switch-input').checked = true;
    addActiveStyle();
  } else if (app.mode === 'play') {
    document.querySelector('.switch-input').checked = false;
    removeActiveStyle();
  };
}

// переход в режим Игры
document.querySelector('.switch-input').addEventListener('change', function () {
  if (!this.checked) {
    app.mode = 'play';
    removeActiveStyle();
  } else {
    app.mode = 'train';
    addActiveStyle();
  }
});

// функция для перетасовки массива
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
};

function playSound(soundSrc) {
  const audio = new Audio();
  audio.src = soundSrc; 
  audio.autoplay = true;
}

// события при клике на Start Game
document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('.btn').classList.add('repeat');
  app.isGameStarted = true;
  setTimeout(playSound, 500, randomSounds[currentSoundIndex]);
  document.querySelector('.rating').classList.remove('none');
});

window.onload = () => {
  if (!localStorage.getItem('mode')) {
    app.mode = 'train';
  } else {app.mode = localStorage.getItem('mode');}
  updateSetsStyles();
  localStorage.clear();
}

document.querySelectorAll('a').forEach(item => {
  item.addEventListener('click', () => {
    localStorage.setItem('mode', app.mode);
  })
})
