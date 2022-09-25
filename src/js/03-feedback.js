import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOKAL_STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

initPage();

const onFormInput = evt => {
  const { name, value } = evt.target;

  try {
    let saveData = load(LOKAL_STORAGE_KEY);
    saveData = saveData ? saveData : {};

    saveData[name] = value;

    save(LOKAL_STORAGE_KEY, saveData);
  } catch (error) {
    console.log(error);
  }
};

const throttleOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttleOnFormInput);

function initPage() {
  const saveData = load(LOKAL_STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
const handleSubmit = e => {
  e.preventDefault();
  //   console.log(e.currentTarget);
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  remove(LOKAL_STORAGE_KEY);
};
formRef.addEventListener('submit', handleSubmit);
