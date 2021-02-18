function palindrome(str) {
  let word = str.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
  return word === word.split("").reverse().join("");
}
