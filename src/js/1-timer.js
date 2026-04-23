import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysTime = document.querySelector('span[data-days]');
const hoursTime = document.querySelector('span[data-hours]');
const minutesTime = document.querySelector('span[data-minutes]');
const secondsTime = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
btn.disabled = true;
let isActive = false;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate <= currentDate) {
      iziToast.show({
        title: '⚠️',
        message: 'Please choose a date in the future',
        theme: 'dark',
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
      btn.disabled = true;
      return;
    }
    btn.classList.add('isActive');
    btn.disabled = false;

    console.log(currentDate);
    console.log(selectedDates[0].getTime());
  },
};

flatpickr(input, options);

btn.addEventListener('click', handleClick);

function handleClick() {
  btn.disabled = true;
  input.disabled = true;
  btn.classList.remove('isActive');

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);

      createTimerInterface({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      input.disabled = false;
      iziToast.show({
        message: 'Countdown finished!',
        backgroundColor: 'green',
        position: 'topRight',
      });
      return;
    }
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function createTimerInterface({ days, hours, minutes, seconds }) {
  daysTime.textContent = pad(days);
  hoursTime.textContent = pad(hours);
  minutesTime.textContent = pad(minutes);
  secondsTime.textContent = pad(seconds);
}
