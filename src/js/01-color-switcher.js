const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');

const changedBody = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      getButtonAttributeDisabled(startButtonEl, stopButtonEl);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    getButtonAttributeDisabled(stopButtonEl, startButtonEl);
    document.body.style.backgroundColor = '#c7d8ff';
  },
};

startButtonEl.addEventListener('click', changedBody.start.bind(changedBody));
stopButtonEl.addEventListener('click', changedBody.stop.bind(changedBody));

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getButtonAttributeDisabled(elDisabled, elEnabled) {
  elDisabled.disabled = true;
  elEnabled.disabled = false;
}
