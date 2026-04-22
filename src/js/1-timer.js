import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysTime = document.querySelector('span[data-days]');
const hoursTime = document.querySelector('span[data-hours]');
const minutesTime = document.querySelector('span[data-minutes]');
const secondsTime = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let isActive = false;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < options.defaultDate) {
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
  isActive = setTimeout(start, 1000);
}
function start() {
  // if (isActive) {
  //   return;
  // }
  // isActive = true;
  intervalId = setInterval(() => {
    const deltaTime = options.defaultDate - userSelectedDate;
    const time = convertMs(deltaTime);
    createTimerInterface(time);
    console.log(time);
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function createTimerInterface({ days, hours, minutes, seconds }) {
  daysTime.textContent = `${days}`;
  hoursTime.textContent = `${hours}`;
  minutesTime.textContent = `${minutes}`;
  secondsTime.textContent = `${seconds}`;
}
