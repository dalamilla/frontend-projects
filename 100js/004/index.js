const form = document.querySelector('#form-message');
const message = document.querySelector('#message');
const dmessage = document.querySelector('p');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (message.value === "") {
    dmessage.textContent = "Empty Message!!";
  } else {
    dmessage.textContent = message.value;
    message.value = "";
  }
});