// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { client } = require('./streamClient');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para crear llamada y token
app.get('/api/createCall', async (req, res) => {
  const { callId, userId } = req.query;

  if (!callId || !userId) {
    return res.status(400).json({ error: 'Faltan parámetros callId y userId' });
  }

  try {
    // Creamos (o recuperamos) la llamada
    const call = client.call('default', callId);
    await call.create();

    // Obtenemos un token para el usuario
    const token = await client.getToken({ user_id: userId });

    return res.json({ callId, token });
  } catch (error) {
    console.error('Error creando la llamada:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
