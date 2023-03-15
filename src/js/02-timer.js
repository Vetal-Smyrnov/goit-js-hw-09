import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  chooseDate: document.querySelector('input#datetime-picker'),
  startCounterButton: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectDate;
refs.startCounterButton.disabled = true;
refs.startCounterButton.style.cursor = 'pointer';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startCounterButton.disabled = false;
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
    const day = hour * 24;
    const hour = minute * 60;
    const minute = second * 60;
    const second = 1000;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: updateCounter,
});

refs.startCounterButton.addEventListener('click', timer.start.bind(timer));

flatpickr(refs.chooseDate, options);

function addLeadingZeros(value) {
  return String(value).padStart(2, '0');
}

function updateCounter({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${addLeadingZeros(days)}`;
  refs.hours.textContent = `${addLeadingZeros(hours)}`;
  refs.minutes.textContent = `${addLeadingZeros(minutes)}`;
  refs.seconds.textContent = `${addLeadingZeros(seconds)}`;
  refs.startCounterButton.setAttribute('disabled', true);
}
