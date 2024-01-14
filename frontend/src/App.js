import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { FaSnowflake } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { CiSun } from "react-icons/ci";

function App() {
  const [temperature, setTemperature] = useState({
    temperature: null,
    color: "white",
  });
  const [icon, setIcon] = useState(<FaSnowflake size={128} />);
  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io("http://localhost:5000");

    // Listen for temperature updates from the server
    socket.on("serverMessage", (data) => {
      if (data) {
        if (data < 20) {
          setTemperature({ temperature: data, color: "#3f51b5" });
          setIcon(<FaSnowflake size={128} />);
        } else if (data < 70) {
          setTemperature({ temperature: data, color: "#4caf50" });
          setIcon(<CiSun size={128} />);
        } else {
          setTemperature({ temperature: data, color: "#f44336" });
          setIcon(<CgDanger size={128} />);
        }
      }
    });
  }, []);
  return (
    <div
      style={{
        color: "white",
        height: "100vh",
        width: "100%",
        backgroundColor: temperature.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {icon}
      <h1>Température reçue:</h1>
      <br />
      {temperature.temperature && <h1>${temperature.temperature} °C</h1>}
    </div>
  );
}

export default App;
