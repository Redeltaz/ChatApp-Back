const socket = io();

let send = () => {
    let text = document.getElementById("msg").value;
    socket.emit('chat', text)
    document.getElementById("msg").value = "";
}

let receive = (msg) => {
    let li = document.createElement('li');
    li.innerText = msg;
    document.getElementById("reception").appendChild(li);
}
socket.on('chat', receive)