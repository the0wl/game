const brazilianCellphoneNumberRegex = /(?:^\([0]?[1-9]{2}\)|^[0]?[1-9]{2}[\.-\s]?)[9]?[1-9]\d{3}[\.-\s]?\d{4}$/

function isValidCellphone(cellphone) {
  return brazilianCellphoneNumberRegex.test(cellphone);
}

console.log(isValidCellphone('51 99792 3384'));
console.log(isValidCellphone('51 99792 3384'));