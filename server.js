const http = require("http");
const fs = require("fs");
const path = require("path");
const mine = {
  ".html": "text/html",
  ".css": "text/css",
  ".jpg": "image/jpg",
};
const server = http.createServer(function (request, response) {
  if (request.url == "/") {
    filePath = "/App.html";
  } else {
    filePath = request.url;
  }
  var fullPath = __dirname + filePath;

  response.writeHead(200, {
    "Content-Type": mine[path.extname(fullPath)] || "text/plain;charset=utf-8",
  });
  fs.readFile(fullPath, function (err, data) {
    if (err) {
      // エラー時の応答
    } else {
      response.end(data, "UTF-8");
    }
  });
});
server.listen(3000);
console.log("server listening...");
