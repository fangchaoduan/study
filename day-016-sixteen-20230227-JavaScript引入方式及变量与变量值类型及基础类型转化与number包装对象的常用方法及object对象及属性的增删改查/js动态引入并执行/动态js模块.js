console.log("这个就是动态js模块");
const theSymbol = Symbol("动态js模块里的东西");
let fang = {
  fang1: "方一",
  theFunction: () => {
    console.log(theSymbol);
  },
};
export { fang };
