function telephoneCheck(str) {
  let regeX = /^(1[\s-]?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/g;
  return regeX.test(str);
}
