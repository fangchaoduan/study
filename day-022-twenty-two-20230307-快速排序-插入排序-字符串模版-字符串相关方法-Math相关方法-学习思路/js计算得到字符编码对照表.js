//思路：使用字符串eval()直接把用js动态创建的字符串来成为字符编码对象的属性名。
//纯原生，不使用内建方法
function getAsciiTable1() {
  const asciiTable = {};
  const hexadecimalString = "0123456789abcdef";
  const theLength = 16 * 16 * 16 * 16;
  for (let i = 0; i < theLength; i++) {
    //得到长度为四位的16进制字符串。
    let hexadecimalNumber = "";
    let baseNumber = 16;
    for (let total = i; total > 0; ) {
      var remainder = total % baseNumber;
      hexadecimalNumber = hexadecimalString[remainder] + hexadecimalNumber;
      total = (total - remainder) / baseNumber;
    }
    let transitionString = "0000" + hexadecimalNumber;
    let fourHexadecimal = "";
    for (let i = 0; i < 4; i++) {
      fourHexadecimal =
        transitionString[transitionString.length - 1 - i] + fourHexadecimal;
    }

    //使用Function()得到类似于eval()的效果，把字符编码转为Unicode字符。
    const charString = `\\u${fourHexadecimal}`;
    const jsString = `return "${charString}"`;
    key = new Function(jsString)();

    asciiTable[key] = i; //把Unicode字符与字符编码关联起来。
  }
  // console.log(asciiTable);
  return asciiTable;
}
console.log(getAsciiTable1())

//纯原生，不使用计算十六进制了，直接四个for循环生成所有的编码字符串，之后再一个for循环得到编码对照表。
function getAsciiTable2() {
  const asciiTable = {};
  const hexadecimalString = "0123456789abcdef";
  const theLength = hexadecimalString.length;
  let charsCode = "";
  for (let i1 = 0; i1 < theLength; i1++) {
    for (let i2 = 0; i2 < theLength; i2++) {
      for (let i3 = 0; i3 < theLength; i3++) {
        for (let i4 = 0; i4 < theLength; i4++) {
          charsCode += `\\u${hexadecimalString[i1]}${hexadecimalString[i2]}${hexadecimalString[i3]}${hexadecimalString[i4]}`;
        }
      }
    }
  }

  const jsString = `return "${charsCode}"`; //使用Function()得到类似于eval()的效果，把字符编码转为Unicode字符。
  const charsString = new Function(jsString)();

  for (let i = 0; i < charsString.length; i++) {
    const key = charsString[i];
    asciiTable[key] = i; //把Unicode字符与字符编码关联起来。
  }

  // console.log(asciiTable);
  return asciiTable;
}
console.log(getAsciiTable2())

//使用内建方法
function getAsciiTable3() {
  const asciiTable = {};
  const theLength = 16 * 16 * 16 * 16;
  for (let i = 0; i < theLength; i++) {
    asciiTable[String.fromCharCode(i)] = i; //String.fromCharCode(字符编码)把字符编码转为Unicode字符，把Unicode字符与字符编码关联起来。
  }
  // console.log(asciiTable);
  return asciiTable;
}
console.log(getAsciiTable3())
