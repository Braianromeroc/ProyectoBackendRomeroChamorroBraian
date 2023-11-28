const socket = io()//Llamado a la dependencia

//Comunicacion con el server
socket.emit('mensaje',"Hola, que tengas buen dia")