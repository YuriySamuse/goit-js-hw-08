import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOKAL_STORAGE_KEY = 'feedback-form-state';

const formData = {};
initPage();

const onFormInput = evt => {
  const { name, value } = evt.target;

  try {
    let saveData = localStorage.getItem(LOKAL_STORAGE_KEY);
    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }

    saveData[name] = value;
    const strigifyData = JSON.stringify(saveData);
    localStorage.setItem(LOKAL_STORAGE_KEY, strigifyData);
  } catch (error) {
    console.log(error);
  }
};

const throttleOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttleOnFormInput);

function initPage() {
  const saveData = localStorage.getItem(LOKAL_STORAGE_KEY);
  if (!saveData) {
    return;
  }

  try {
    const parseData = JSON.parse(saveData);
    Object.entries(parseData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  } catch (error) {
    console.error(error);
  }
}

const handleSubmit = e => {
  e.preventDefault();
  //   console.log(e.currentTarget);
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  localStorage.removeItem(LOKAL_STORAGE_KEY);
};
formRef.addEventListener('submit', handleSubmit);
