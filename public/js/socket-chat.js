var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('chatLogin', usuario, function(resp){
        console.log('Usuarios conectados', resp);
    })
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('sendMessage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Esuchar broadcast de los usuarios
socket.on('sendMessage', function(message){
    console.log('Servidor: ', message)
})

// Escuchar logout
socket.on('logoutEvent', function(data) {
    console.log('Servidor:', data);
});

//Esuchar cuando un usario entra o sale del chat 
socket.on('loginEvent', function(data){
    console.log(data)
})

// Mensajes privados
socket.on('P2Pmessage', function(message){
    console.log('Mensaje privado', message)
})