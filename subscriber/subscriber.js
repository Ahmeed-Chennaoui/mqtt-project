// subscriber.js

const express = require("express");
const mqtt = require("mqtt");
const http = require('http');
const socketIO = require("socket.io");
const brokerUrl = "mqtt://test.mosquitto.org";
const topic = "Temp";

const app = express();
const port = 3000;
const webPort = 5000;

const server = http.createServer(app);
server.listen(webPort)
const client = mqtt.connect(brokerUrl);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get("/", (req, res) => {
  res.send("Application Subscriber");
});

client.on("connect", () => {
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Connecté au broker MQTT. Écoute du topic "${topic}"...`);
    }
  });
});

client.on("message", (topic, message) => {
  if (topic === "Temp") {
    const temperature = message.toString();
    console.log(`Température reçue: ${temperature} °C`);
    // Ici, vous pourriez mettre en œuvre la logique d'affichage sur une interface web.
    io.emit('serverMessage', temperature);

  }
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});