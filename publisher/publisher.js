const mqtt = require("mqtt");

const brokerUrl = "mqtt://test.mosquitto.org";

const topic = "Temp";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  setInterval(() => {
    const temperature =
      Math.floor(Math.random() * 200) - Math.floor(Math.random * 1000);
    client.publish(topic, temperature.toString());
    console.log(`Température publiée: ${temperature} °C`);
  }, 5000);
});
