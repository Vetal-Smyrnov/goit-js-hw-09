import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onInputData);

function onInputData(event) {
  event.preventDefault();

  let delay = +event.target.elements.delay.value;
  const step = +event.target.elements.step.value;
  const amount = +event.target.elements.amount.value;

  if (
    !event.target.elements.delay.value ||
    !event.target.elements.step.value ||
    !event.target.elements.amount.value
  ) {
    Notiflix.Notify.failure('Please fill all fields');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
