let mode = 'train';

// переход в режим Игры
// document.querySelector('.switch-input').addEventListener('change', () => {
//   if (!this.checked) {
//     // mode = 'play';
//     document.querySelector('.navigation').classList.remove('green');
//     document.querySelectorAll('.main-card').forEach((item) => {
//       item.classList.remove('green');
//     });
//   } else {
//     // mode = 'train';
//     document.querySelector('.navigation').classList.add('green');
//     document.querySelectorAll('.main-card').forEach((item) => {
//       item.classList.add('green');
//     });
//   };
// });

// document.querySelector('#menu__toggle').addEventListener('click', () => {
//   if (document.getElementById('menu__toggle').checked === true) {
//     document.querySelector('body').style.overflow = 'hidden';
    
//   }
//   if (document.getElementById('menu__toggle').checked === false) {
//     document.querySelector('body').style.overflow = 'visible';
//   }
// });

function updateSetsStyles() {
  if (mode === 'train') {
    document.querySelector('.switch-input').checked = true;
    addGreenStyle();
  } else if (mode === 'play') {
    document.querySelector('.switch-input').checked = false;
    removeGreenStyle();
  };
}

function removeGreenStyle() {
  document.querySelector('.navigation').classList.remove('green');
  document.querySelectorAll('.main-card').forEach((item) => {
    item.classList.remove('green');
  });
}

function addGreenStyle() {
  document.querySelector('.navigation').classList.add('green');
  document.querySelectorAll('.main-card').forEach((item) => {
    item.classList.add('green');
  });
}

// переход в режим Игры
document.querySelector('.switch-input').addEventListener('change', function () {
  if (!this.checked) {
    mode = 'play';
    removeGreenStyle();
  } else if (this.checked) {
    mode = 'train';
    addGreenStyle();
  };
});

document.querySelector('#menu__toggle').addEventListener('click', function() {
  if (document.getElementById('menu__toggle').checked === true) {
    document.querySelector('body').style.overflow = 'hidden';
  }
  if (document.getElementById('menu__toggle').checked === false) {
    document.querySelector('body').style.overflow = 'visible';
  }
});

window.onload = () => {
  mode = localStorage.getItem('mode');
  updateSetsStyles();
  localStorage.clear();
}

document.querySelectorAll('a').forEach(item => {
  item.addEventListener('click', () => {
    localStorage.setItem('mode', mode);
  })
})