function charCodeAt(theString = "", index) {
  const asciiTable = {};
  const hexadecimalString = "0123456789abcdef";
  const theLength = 16 * 16 * 16 * 16;
  for (let i = 0; i < theLength; i++) {
    let hexadecimalNumber = "";
    let baseNumber = 16;
    for (let total = i; total > 0; ) {
      var remainder = total % baseNumber;
      hexadecimalNumber = hexadecimalString[remainder] + hexadecimalNumber;
      total = (total - remainder) / baseNumber;
    }
    let transitionString = "0000" + hexadecimalNumber;
    let charCode = "";
    for (let j = 0; j < 4; j++) {
      charCode = transitionString[transitionString.length - 1 - j] + charCode;
    }

    const charString = `\\u${charCode}`;
    const jsString = `return "${charString}"`;
    key = new Function(jsString)();
    if (key === "f") {
      console.log(key, i, hexadecimalNumber, transitionString, charCode);
    }
    asciiTable[key] = i;
  }
  //console.log(asciiTable);
  return asciiTable[theString[index]];
}
console.log(charCodeAt("fang", 1));
console.log("fang".charCodeAt(1));
