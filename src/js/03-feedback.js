import throttle from 'lodash.throttle';

const formData = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

formData.form.addEventListener('input', throttle(handleFormInputs, 500));
formData.form.addEventListener('submit', handleFormSubmit);
// formData.textarea.addEventListener('input', throttle(handleTextareaInput, 500));

// function handleTextareaInput(event) {
//   const message = event.target.value;
//   localStorage.setItem(STORAGE_KEY, message);
//   console.log(event);
// }

function handleFormSubmit(event) {
  event.preventDefault();
  if (formData.email.value === '' || formData.textarea.value === '') {
    console.log('validation error');
    return;
  }
  console.log('email: ', formData.email.value);
  console.log('message: ', formData.textarea.value);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function handleFormInputs() {
  //   const message = event.target.value;
  //   formData[event.target.name] = message;
  const inputsObj = {
    email: formData.email.value,
    message: formData.textarea.value,
  };
  console.log(inputsObj);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputsObj));
  //   console.log(event);
}

storageForFormInputs();

function storageForFormInputs() {
  const savedInputs = localStorage.getItem(STORAGE_KEY);
  //   console.log(savedInputs);

  const objOfSavedInputs = JSON.parse(savedInputs);
  console.log(objOfSavedInputs);
  if (objOfSavedInputs && objOfSavedInputs.message) {
    formData.textarea.value = objOfSavedInputs.message;
  }

  if (objOfSavedInputs && objOfSavedInputs.email) {
    formData.email.value = objOfSavedInputs.email;
  }
}
