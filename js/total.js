localStorage.setItem('mode', 'play');

if (localStorage.getItem('error') === '0') {
  document.querySelector('h1').innerHTML = `Win!`;
  document.querySelector('img').src = "../assets/img/success.jpg";
  document.querySelector('.soundEffects').src = '../assets/audio/success.mp3';
  document.querySelector('.soundEffects').autoplay = true;
  setTimeout(() => window.location.href = '../index.html', 5000);
} else {
  document.querySelector('h1').innerHTML = `You have ${localStorage.getItem('error')} error!`;
  document.querySelector('img').src = "../assets/img/failure.jpg";
  document.querySelector('.soundEffects').src = '../assets/audio/failure.mp3';
  document.querySelector('.soundEffects').autoplay = true;
  localStorage.removeItem('error');
  setTimeout(() => window.location.href = '../index.html', 5000);
}

