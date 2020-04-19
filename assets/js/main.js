// переход в режим Игры
document.querySelector('.switch-input').addEventListener('change', function () {
  if (!this.checked) {
    document.querySelector('.navigation').classList.remove('green');
    document.querySelectorAll('.main-card').forEach((item) => {
      item.classList.remove('green');
    });
  } else {
    document.querySelector('.navigation').classList.add('green');
    document.querySelectorAll('.main-card').forEach((item) => {
      item.classList.add('green');
    });
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

