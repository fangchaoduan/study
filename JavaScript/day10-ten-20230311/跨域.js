const http = require("http");

var data = { name: "BruceLee", password: "123456" };

const server = http.createServer((request, response) => {
  console.log("request--->", request);
  // const theURL = new URL(request.url, `http://${request.getHeaders().host}`);
  if (request.url === "/fang") {
    response.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
    });

    // 返回一段 JavaScript 代码
    const theData = { name: "自定义数据", request };
    const dataString = JSON.stringify(theData);
    response.end("前端与后端约定的自定义函数(" + dataString + ")");
  }

  if (request.url === "/") {
    response.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
    });

    // 返回一段 JavaScript 代码
    response.end("jsonpCallback(" + JSON.stringify(data) + ")");
  }
});

server.listen(3000, () => {
  console.log("The server is running at http://localhost:3000");
});
