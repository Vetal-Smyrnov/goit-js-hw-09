import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  chooseDate: document.querySelector('input#datetime-picker'),
  startCounterBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectDate;
refs.startCounterBtn.disabled = true;
refs.startCounterBtn.style.cursor = 'pointer';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startCounterBtn.disabled = false;
      selectDate = selectedDates;
    }
  },
};
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deltaTime = selectDate - Date.now();
      const timeCounter = this.convertMs(deltaTime);

      this.onTick(timeCounter);

      if (deltaTime <= 999) {
        Notiflix.Notify.success('The countdown is over!');
        clearInterval(this.intervalId);
        this.isActive = false;
        const timeCounter = this.convertMs(deltaTime);
        this.onTick(timeCounter);
      }
    }, 1000);
  }

  convertMs(ms) {
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
}

const timer = new Timer({
  onTick: updateCounter,
});

refs.startCounterBtn.addEventListener('click', timer.start.bind(timer));

flatpickr(refs.chooseDate, options);

function updateCounter({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
  refs.startCounterBtn.setAttribute('disabled', true);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
