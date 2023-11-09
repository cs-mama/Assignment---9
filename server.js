const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const crypto = require('crypto');
const Influx = require('influx');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// InfluxDB setup
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'mydb',
});

// Your route definitions go here...
app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit encrypted data to the frontend
  const encryptedData = generateEncryptedData();
  socket.emit('encryptedData', encryptedData);

  // Listen for decrypted data from the frontend
  socket.on('decryptedData', (data) => {
    console.log('Decrypted Data:', data);

    // Save data to InfluxDB
    influx.writePoints([
      {
        measurement: 'data',
        fields: { value: data },
      },
    ]);

    // Emit saved data back to the frontend
    socket.emit('savedData', { value: data });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
