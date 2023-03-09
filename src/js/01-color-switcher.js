const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const changedBody = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      getBtnAttributeDisabled(startBtn, stopBtn);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    getBtnAttributeDisabled(stopBtn, startBtn);
    document.body.style.backgroundColor = '#c7d8ff';
  },
};

startBtn.addEventListener('click', changedBody.start.bind(changedBody));
stopBtn.addEventListener('click', changedBody.stop.bind(changedBody));

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getBtnAttributeDisabled(elDisabled, elEnabled) {
  elDisabled.disabled = true;
  elEnabled.disabled = false;
}
