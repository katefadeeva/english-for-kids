import {cards} from './cards.js';

// функция для определения параметра
function getUrlVars() {
  return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/)[1];
}

// создаем main elements
const main = document.createElement('section');
const rating = document.createElement('div');

function container() {
  const fragment = document.createDocumentFragment();
  
    cards[getUrlVars()].forEach((item) => {
      
      const cardContainer = document.createElement('div');
      const card = document.createElement('div');
      const front = document.createElement('div');
      const back = document.createElement('div');
      const headerFront = document.createElement('div');
      const headerBack = document.createElement('div');
      const rotate = document.createElement('div');
  
      cardContainer.classList.add('card-container');
      card.classList.add('card');
      front.classList.add('front');
      back.classList.add('back');
      headerFront.classList.add('card-header');
      headerBack.classList.add('card-header');
      rotate.classList.add('rotate');

      headerFront.innerHTML = item.word;
      headerBack.innerHTML = item.translation;
      front.style.backgroundImage = `url(${item.image})`;
      back.style.backgroundImage = `url(${item.image})`;
  
      cardContainer.appendChild(card);
      card.appendChild(front);
      front.appendChild(headerFront);
      card.appendChild(back);
      back.appendChild(headerBack);
      card.appendChild(rotate);
    
      fragment.appendChild(cardContainer);
    });
    
  return fragment;
  
}

const btns = document.createElement('div');
const audio = document.createElement('audio');
const soundEffect = document.createElement('audio');

// добавляем классы
main.classList.add('container');
rating.classList.add('rating', 'none');


btns.classList.add('btns');
audio.classList.add('audio');
soundEffect.classList.add('soundEffects');

// добавляем всё в DOM
  main.appendChild(rating);
  main.appendChild(container());
  main.appendChild(btns);
  main.appendChild(audio);
  main.appendChild(soundEffect);
  document.body.appendChild(main);
