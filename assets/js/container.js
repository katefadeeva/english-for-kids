import {cards} from './cards.js';
import {urlParamsMap} from './mapping.js';
  
  export function getUrlVars() {
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/)[1];
  }
  export function createContainer() {
    const h1 = document.createElement('h1');
    h1.classList.add('green');
    h1.innerHTML = urlParamsMap.get(getUrlVars());

    // создаем main elements
    const main = document.createElement('section');
    const rating = document.createElement('div');

    function container() {
      const fragment = document.createDocumentFragment();
      
        cards[getUrlVars() || 'ActionA'].forEach((item) => {
          
          const cardContainer = document.createElement('div');
          const card = document.createElement('div'); 
          const audio = document.createElement('audio');
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
          audio.classList.add('audio');

          audio.src = `${item.audioSrc}`;
          headerFront.innerHTML = item.word;
          headerBack.innerHTML = item.translation;
          front.style.backgroundImage = `url(${item.image})`;
          back.style.backgroundImage = `url(${item.image})`;
      
          cardContainer.appendChild(card);
          card.appendChild(front);
          card.appendChild(audio);
          front.appendChild(headerFront);
          card.appendChild(back);
          back.appendChild(headerBack);
          card.appendChild(rotate);
        
          fragment.appendChild(cardContainer);
        });
        
      return fragment;
      
    };

    const btns = document.createElement('div');
    const button = document.createElement('button');
    const soundEffect = document.createElement('audio');

    // добавляем классы
    main.classList.add('container');
    rating.classList.add('rating', 'none');
    button.classList.add('btn', 'none');
    btns.classList.add('btns');

    soundEffect.classList.add('soundEffects');

    button.innerHTML = 'Start game';

    // добавляем всё в DOM
    main.appendChild(rating);
    main.appendChild(container());
    btns.appendChild(button);
    main.appendChild(btns);
    main.appendChild(soundEffect);
    document.querySelector('.wrapper').appendChild(h1);
    document.querySelector('.wrapper').appendChild(main);

  }