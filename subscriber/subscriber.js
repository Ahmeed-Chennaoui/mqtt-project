// subscriber.js

// Importation des modules requis
const express = require("express");
const mqtt = require("mqtt");
const http = require('http');
const socketIO = require("socket.io");

// URL du courtier MQTT et le sujet (topic) à écouter
const brokerUrl = "mqtt://test.mosquitto.org";
const topic = "TempIOT";

// Initialisation d'une application Express
const app = express();
const port = 3000;// Port pour l'application Express
const webPort = 5000;// Port pour le serveur WebSocket

// Création du serveur HTTP
const server = http.createServer(app);
server.listen(webPort)

// Connexion au courtier MQTT
const client = mqtt.connect(brokerUrl);

// Initialisation du serveur WebSocket avec CORS activé
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Gestionnaire d'événement lorsque le client se connecte au serveur WebSocket
io.on('connection', (socket) => {
  console.log('Client connected');

  // Gestionnaire d'événement lorsque le client se déconnecte du serveur WebSocket
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Route pour la page d'accueil de l'application
app.get("/", (req, res) => {
  res.send("Application Subscriber");
});

// Gestionnaire d'événement lors de la connexion au courtier MQTT
client.on("connect", () => {
    // Abonnement au sujet (topic) spécifié
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Connecté au broker MQTT. Écoute du topic "${topic}"...`);
    }
  });
});

// Gestionnaire d'événement lors de la réception d'un message depuis le courtier MQTT
client.on("message", (topic, message) => {
  if (topic === "Temp") {
    const temperature = message.toString();
    console.log(`Température reçue: ${temperature} °C`);
    // Émission du message aux clients connectés via le serveur WebSocket
    io.emit('serverMessage', temperature);

  }
});

// Démarrage du serveur Express
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});