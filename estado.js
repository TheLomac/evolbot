const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.on('ready', () => {
  // Leer el archivo
  fs.readFile('versiones.txt', 'utf8', (err, data) => {
    if (err) throw err;

    // Convertir el contenido del archivo en una matriz de líneas
    const lineas = data.split('\n');

    // Acceder a la última línea
    const ultimaLinea = lineas[lineas.length - 1];

    // Establecer el estado del bot
    client.user.setPresence({
      status: 'online',
      activity: {
        name: ultimaLinea,
        type: 'PLAYING'
      }
    });
  });
});