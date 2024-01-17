// publisher.js

// Importe la bibliothèque MQTT
const mqtt = require("mqtt");

// URL du courtier MQTT (broker)
const brokerUrl = "mqtt://test.mosquitto.org";

// Sujet (topic) sur lequel les données seront publiées
const topic = "Temp";

// Crée un client MQTT en se connectant au courtier
const client = mqtt.connect(brokerUrl);

// Lorsque la connexion avec le courtier est établie
client.on("connect", () => {
    // Met en place une fonction qui s'exécute toutes les 5000 millisecondes (5 secondes)
  setInterval(() => {
        // Génère une température aléatoire entre 0 et 150 degrés Celsius
    const temperature = Math.floor(Math.random() * 150);
        // Publie la température sur le sujet (topic) spécifié
    client.publish(topic, temperature.toString());
        // Affiche un message dans la console indiquant la température publiée
    console.log(`Température publiée: ${temperature} °C`);
  }, 5000);
});