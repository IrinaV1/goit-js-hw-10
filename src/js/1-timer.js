import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let userSelectedDate = null;
// let isActive = false;
iziToast.show({
  title: '⚠️',
  message: 'Please choose a date in the future',
  theme: 'dark',
  // color: 'red',
  backgroundColor: '#ff0000',
  position: 'topRight',
  timeout: 4000,
  progressBar: false,
  close: true,
  closeOnClick: true,
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < options.defaultDate) {
      btn.classList.remove('isActive');
    } else {
      btn.classList.add('isActive');
    }
    console.log(options.defaultDate);

    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);
btn.addEventListener('click', handleClick);

function handleClick() {
  if (userSelectedDate) {
    btn.classList.remove('isActive');
  }
}
