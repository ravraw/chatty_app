// server.js
const uuidv1 = require('uuid/v1');
const express = require('express');
const SocketServer = require('ws').Server;

// Color
//const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb'];
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', ws => {
  console.log('One more ---------Client connected');

  //ws.on('open', function open() {
  wss.clients.forEach(function e(client) {
    if (client == ws) {
      client.send(
        JSON.stringify({ type: 'userColor', color: `${getRandomColor()}` })
      );
    }
  });

  //ws.on('open', function open() {
  wss.clients.forEach(function e(client) {
    // if (client != ws) {
    client.send(
      JSON.stringify({
        type: 'clientCount',
        count: wss.clients.size
      })
    );
  });
  //});

  ws.on('message', function incoming(message) {
    const {
      type,
      username,
      content,
      userColor,
      imgURL,
      createdAt
    } = JSON.parse(message);
    if (type === 'postMessage') {
      let returnMessage = {
        id: uuidv1(),
        type: 'incomingMessage',
        username,
        content,
        userColor,
        imgURL,
        createdAt
      };

      wss.clients.forEach(function e(client) {
        client.send(JSON.stringify(returnMessage));
      });
    }
    if (type === 'postNotification') {
      let returnMessage = {
        id: uuidv1(),
        type: 'incomingNotification',
        content,
        userColor,
        createdAt
      };
      wss.clients.forEach(function e(client) {
        client.send(JSON.stringify(returnMessage));
      });
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function e(client) {
      client.send(
        JSON.stringify({
          type: 'clientCount',
          count: wss.clients.size
        })
      );
    });
  });
});
