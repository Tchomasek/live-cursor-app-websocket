const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

wsServer.on("connection", (createConnection, request) => {
  const { username } = url.parse(request.url, true).query;
  console.log(`New connection from user: ${username}`);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
