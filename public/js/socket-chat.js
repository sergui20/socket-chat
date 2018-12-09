var socket = io();

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('chatLogin', usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderUsers(resp)
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('sendMessage', function(mensaje) {
    // console.log('Servidor:', mensaje);

    renderMessage(mensaje, false)
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('loginEvent', function(personas) {
    renderUsers(personas, false)
});

socket.on('logoutEvent', function(mensaje){
    renderMessage(mensaje)
})

// Mensajes privados
socket.on('P2Pmessage', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});