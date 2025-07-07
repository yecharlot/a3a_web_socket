const WebSocket = require('ws');

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ port: 3000 });

// Almacenar clientes conectados
const clients = new Set();

// Manejar nuevas conexiones
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    clients.add(ws);
    
    // Escuchar mensajes desde el cliente
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);

        // Responder al cliente
        //ws.send(`Mensaje recibido: ${message}`);
      broadcast(message)
    });

    // Manejar cuando un cliente se desconecta
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    // Enviar un mensaje inicial al cliente
    //ws.send('Pancho');
    
});

// Función para enviar notificaciones a todos los clientes conectados
function broadcast(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}


//Ejemplo de uso: Enviar notificaciones periódicas
setInterval(() => {
   broadcast(`Notificación segura: ${new Date().toLocaleTimeString()}`);
}, 5000);
