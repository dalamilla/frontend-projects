const number = document.querySelector('p');
const buttons = document.querySelectorAll('.btncounter');
let count = 0;
number.textContent = 0;


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains("reduce")) {
      count--;
    }
    if (button.classList.contains("add")) {
      count++;
    }
    number.textContent = count;

    if (count > 0) {
      number.style.color = "#1D8389";
    } else if (count < 0) {
      number.style.color = "#F94D3D";
    } else {
      number.style.color = "#000";
    }
  })
});