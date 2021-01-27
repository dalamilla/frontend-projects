const button = document.querySelector('input');
const body = document.querySelector('body');
const colorsArray = ['blue', 'red', 'green', 'yellow', 'orange', 'pink'];

button.addEventListener('click', () => {
  let randomColor = Math.floor(Math.random() * colorsArray.length).toString(16);
  body.style.backgroundColor = colorsArray[randomColor];
});