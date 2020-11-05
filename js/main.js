let mode = 'train';

function updateSetsStyles() {
  if (mode === 'train') {
    document.querySelector('.switch-input').checked = true;
    addActiveStyle();
  } else if (mode === 'play') {
    document.querySelector('.switch-input').checked = false;
    removeActiveStyle();
  };
}

function removeActiveStyle() {
  document.querySelector('.navigation').classList.remove('active');
  document.querySelectorAll('.main-card').forEach((item) => {
    item.classList.remove('active');
  });
}

function addActiveStyle() {
  document.querySelector('.navigation').classList.add('active');
  document.querySelectorAll('.main-card').forEach((item) => {
    item.classList.add('active');
  });
}

// переход в режим Игры
document.querySelector('.switch-input').addEventListener('change', function () {
  if (!this.checked) {
    mode = 'play';
    removeActiveStyle();
  } else if (this.checked) {
    mode = 'train';
    addActiveStyle();
  };
});

document.querySelector('#menu__toggle').addEventListener('click', () => {
  document.querySelector('body').style.overflow = document.getElementById('menu__toggle').checked ? 'hidden' : 'visible';
});

window.onload = () => {
  mode = localStorage.getItem('mode');
  updateSetsStyles();
  localStorage.clear();
}

document.querySelectorAll('a').forEach(item => {
  item.addEventListener('click', () => {
    if(mode) { localStorage.setItem('mode', mode); }
  })
})