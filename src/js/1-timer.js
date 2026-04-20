import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

let isActive = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let userSelectedDate = null;
if (userSelectedDate) {
  window.alert('Please choose a date in the future');
}

flatpickr(input, options);
btn.addEventListener('click', handleClick);

function handleClick() {}
