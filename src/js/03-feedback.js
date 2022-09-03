import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.querySelector('[type="email"]');
const messageInput = formEl.querySelector('[name="message"]');

const savedInputData = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedInputData) {
  const parsedObject = JSON.parse(savedInputData);
  emailInput.value = parsedObject.email;
  messageInput.value = parsedObject.message;
}
const updateStorage = () => {
  const inputData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  const stringObj = JSON.stringify(inputData);
  localStorage.setItem(LOCAL_STORAGE_KEY, stringObj);
};

const submitHandler = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

formEl.addEventListener('input', throttle(updateStorage, 500));
formEl.addEventListener('submit', submitHandler);
