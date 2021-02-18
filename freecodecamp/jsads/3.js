function rot13(str) {

  return str.replace(/([A-M])|([N-Z])/g, (letter, state) => {
    if(state){
      return String.fromCharCode(letter.charCodeAt(0) + 13);
    } else {
      return String.fromCharCode(letter.charCodeAt(0) - 13); 
    }
  });
}
