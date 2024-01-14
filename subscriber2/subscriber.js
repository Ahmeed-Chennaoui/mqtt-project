// subscriber.js

const express = require("express");
const mqtt = require("mqtt");
const brokerUrl = "mqtt://test.mosquitto.org";
const topic = "Temp";

const app = express();
const port = 3000;

const client = mqtt.connect(brokerUrl);

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
  }
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
