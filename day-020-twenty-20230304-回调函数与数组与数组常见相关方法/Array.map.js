function map(theArray = [], callback = () => {}) {
  const res = [];
  for (let i = 0; i < theArray.length; i++) {
    const item = theArray[i];
    const index = i;
    const selfArray = theArray;
    const callbackReturn = callback(item, index, selfArray);
    res[res.length] = callbackReturn;
  }
  return res;
}
const theCallback = (item, index, array) => {
  console.log("theCallback()内部打印", item, index, array, +a);
  return "theCallback()内部return" + index;
};
const thisArray = [0, 1, 2, 3, 4, 5];
console.log(thisArray.map(theCallback));
console.log(map(thisArray, theCallback));
