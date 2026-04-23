import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const el = event.target.elements;
  const elements = el.state.value;
  const delay = Number(el.delay.value);
  console.log(delay);
  console.log(elements);
  if (delay <= 0) return;

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (elements === 'fulfilled') {
        resolve('fulfilled');
      } else {
        reject('rejected');
      }
    })
      .then(value => {
        iziToast.show({
          title: '✅',
          message: ` Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#2ecc71',
          titleColor: '#fff',
          messageColor: '#fff',
        });
      })
      .catch(error => {
        iziToast.show({
          title: '❌',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#e74c3c',
          titleColor: '#fff',
          messageColor: '#fff',
        });
      });
  }, delay);
}
