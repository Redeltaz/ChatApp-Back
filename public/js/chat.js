const socket = io();
let startChat;

let sessionPseudo = document.cookie.split('; ').find(row => row.startsWith('pseudo')).split('=')[1];
let pseudo = document.createElement('p');
pseudo.innerText = sessionPseudo;
document.getElementsByClassName("pseudo")[0].appendChild(pseudo);

const send = () => {
    let text = document.getElementById("msg").value;
    socket.emit('chat', text)
    document.getElementById("msg").value = "";
}

socket.on('chat', (msg) => {
    let li = document.createElement('li');
    li.innerText = msg;
    document.getElementById("reception").appendChild(li);
})

socket.on('oldchat', (oldmsg) => {
    for (k in oldmsg) {
        let result = oldmsg[k];
        result = {
            message: result.content,
            sender: result.sender
        }
        let li = document.createElement('li');
        li.innerText = result.sender + " : " + result.message;
        document.getElementById("reception").appendChild(li);
    }
})