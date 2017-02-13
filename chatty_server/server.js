const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const PORT = 4000;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    console.log("sending to client")
    client.send(data);
    console.log(data);
  });
};

let userCount = 0;

wss.on('connection', (socket) => {
  userCount++;
  wss.broadcast(JSON.stringify({
    type: 'userCount',
    userCount: userCount
    })
  );

  socket.on('message', (message, username) => {
    const parseMessage = JSON.parse(message);
    console.log(parseMessage);
    let newMessage = {};

    if (parseMessage.type === "postMessage") {
      newMessage = {
        type: "incomingMessage",
        id: uuid.v1(),
        username: parseMessage.username,
        content: parseMessage.content
      };
      console.log(newMessage);
    }

    if (parseMessage.type === "postNotification") {
      newMessage = {
        type: "incomingNotification",
        id: uuid.v4(),
        content: parseMessage.content
      };
      console.log(newMessage);
    }

    wss.broadcast(JSON.stringify(newMessage));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => {
    console.log('Client disconnected');
    userCount--;
    wss.broadcast(JSON.stringify({ type: 'userCount', content: userCount }));
  });
});
