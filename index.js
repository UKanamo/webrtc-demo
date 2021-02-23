var constraints = {
  audio: true,
  video: true
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream
})

peer.on('signal', function(data) {
  document.getElementById('yourId').value = JSON.stringify(data);
})

document.getElementById('connect').addEventListener('click', function() {
  var otherId = JSON.parse( document.getElementById('otherId').value);
  peer.signal(otherId);
})

document.getElementById('send').addEventListener('click', function () {
  var yourMessage = document.getElementById('yourMessage').value;
  peer.send(yourMessage);
})

peer.on('data', function (data) {
  document.getElementById('messages').textContent += data + '\n';
})

peer.on('stream', function(stream) {
  const video = document.createElement('video')
  video.srcObject = stream
  document.body.appendChild(video)
  video.play()
})

}).catch(function(error) {
  console.error(error);
})