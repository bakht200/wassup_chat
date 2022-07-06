const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');


do{
    name = prompt('please enter name');
}
while(!name)

textarea/addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendmessage(e.target.value);
    }
})

function sendmessage(message){
    let msg = {
        user : name,
        message: message.trim(),
    }
textarea.value=''


    // Append message

    appendMessage(msg , 'outgoing');

    //semd to server/

    socket.emit('message',msg);
}

function appendMessage(msg , type) {
    let mainDiv = document.createElement('div')
    let className = type;

    mainDiv.classList.add(className,'message');

    let markup = `
    <h4> ${msg.user}</h4>
    <p> ${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    
    messageArea.appendChild(mainDiv);
}


///recieve message///

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})