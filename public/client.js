

const socket = io();

const chatOutput = document.getElementById('chat-output');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const R= getRandomNumber();
const G= getRandomNumber();
const B= getRandomNumber();
var rid = '';

 // Function to play the sound
 function playSound() {
  const audio = document.getElementById('audio-element');
  audio.play();
}

// Function to stop the sound
function stopSound() {
  const audio = document.getElementById('audio-element');
  audio.pause();
  audio.currentTime = 0;
}

// Add an event listener to the button to conditionally play the sound
const playButton = document.getElementById('play-button');
playButton.addEventListener('click', () => {
  // Add your conditions here to determine whether to play the sound
  const shouldPlaySound = true; // Change this condition as needed

    socket.emit('playsound',rid);
    console.log("sending rid to playsound server ",rid);

});

function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  
  if (message.trim() !== '') {
   
    const username = document.getElementById('inputfield').value;
    console.log(message,username);
    socket.emit('message', [message,username,R,G,B,rid]);
    messageInput.value = '';
  }
});

// Receive and display messages from the server
socket.on('message', (ar) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = (ar[1]+ " : " + ar[0]);
  chatOutput.appendChild(messageElement);
  messageElement.style=`border: solid 2px blue; border-radius : 20px 20px 20px 20px; padding : 10px;background-color: rgb(${ar[2]},${ar[3]},${ar[4]}); color:white;margin-top:10px`;
});


socket.on('playsound', (rd) => {
 playSound();
});


function joinroom()
{
  const roomid = document.getElementById('roomidfield').value;
  console.log("roomid = ",roomid," rid = ",rid);
  rid = roomid;
  console.log("roomid = ",roomid," rid = ",rid);
  console.log('calling server for joining room ',rid);
  socket.emit('join',roomid);
}
