console.log("Hello there");

const http = require("http");

const app = http.createServer((request, response) =>{
  response.writeHead(200, { "content-Type": "text/html" });
  response.end("<h1>Hello World</h1>");
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
