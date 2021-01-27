const button = document.querySelector('input');
const body = document.querySelector('body');
const strong = document.querySelector('strong');

button.addEventListener('click', () => {
  let randomColor = "#000000".replace(/0/g, () => {
    return Math.floor(Math.random() * 16).toString(16);
  });
  body.style.backgroundColor = randomColor;
  strong.textContent = randomColor;
});