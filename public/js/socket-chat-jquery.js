var params = new URLSearchParams(window.location.search);

let sidebar = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let textMessage = $('#TextMessage');
let chatBox = $('#divChatbox');

// Funciones para renderizar usuarios
function renderUsers(users){
    console.log(users)

    let html ='';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala') +'</span></a>';
    html += '</li>';
    
    for(let i = 0; i < users.length; i++){
        html += '<li>';
        html += '   <a data-id="'+ users[i].id +'" href="javascript:void(0)"><img src="assets/images/users/user-pic.png" alt="user-img" class="img-circle"> <span>'+ users[i].username +'<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    sidebar.html(html)
}


function renderMessage(data, miMensaje){

    let html = '';
    let fecha = new Date(data.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();
    let adminClass = 'info';
    if(data.nombre === 'Admin' || data.nombre === 'Administrador'){
        adminClass = 'danger';
    }

    if(miMensaje){
        html += '<li class="reverse">';
        html +=    '<div class="chat-content">';
        html +=        '<h5>'+ data.nombre +'</h5>';
        html +=        '<div class="box bg-light-success">'+ data.mensaje +'</div>';
        html +=    '</div>';
        html +=    '<div class="chat-img"><img src="assets/images/users/user-pic.png" alt="user" /></div>';
        html +=    '<div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        
        if(data.nombre === 'Admin' || data.nombre === 'Administrador'){
            html +=    '<div class="chat-content">';
            html +=        '<div class="box bg-light-inverse">'+ data.mensaje +'</div>';
            html +=    '</div>';
            html +=    '<div class="chat-time">'+ hora +'</div>';
            html += '</li>';
        } else {
            html +=    '<div class="chat-img"><img src="assets/images/users/user-pic.png" alt="user" /></div>';
            html +=    '<div class="chat-content">';
            html +=        '<h5>'+ data.nombre +'</h5>';
            html +=        '<div class="box bg-light-inverse">'+ data.mensaje +'</div>';
            html +=    '</div>';
            html +=    '<div class="chat-time">'+ hora +'</div>';
            html += '</li>';
        }
    }

    chatBox.append(html);
}


sidebar.on('click', 'a', function(){
    let id = $(this).data('id');
    
    if(id){
        console.log(id)
    }
})

formEnviar.on('submit', function(ev){
    ev.preventDefault();

    if (textMessage.val().trim().length === 0){
        return
    }

    //Enviar información
    socket.emit('sendMessage', {
        name: params.get('nombre'),
        message: textMessage.val()
    }, function(msg) {
        console.log(msg)
        textMessage.val('').focus();
        renderMessage(msg, true)
    });
})