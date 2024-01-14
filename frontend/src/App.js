import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const prevColor = useRef('white');
  const [temperature, setTemperature] = useState({'temperature': null,'color':'white'});
  const [color, setColor] = useState('white');
  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io('http://localhost:5000');

    // Listen for temperature updates from the server
    socket.on('serverMessage', (data) => {
      if (data)
      {
        if (data < 30)
        {setTemperature({'temperature': data,'color':'blue'})}
      else if (data < 70)
      {setTemperature({'temperature': data,'color':'green'})}
      else        {setTemperature({'temperature': data,'color':'red'})}

      }
    })});
  return (
    <div style={{height:'100vh',width:'100%' ,backgroundColor:temperature.color,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <h3>Température reçue:</h3>
      <br/>
      { temperature.temperature && <h3>${temperature.temperature} °C</h3> }
    </div>
  );
}

export default App;
