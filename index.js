var constraints = {
  audio: true,
  video: { width: 1280, height: 720 }
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* カメラ使えるよ */
var Peer = require('simple-peer')
var peer = new Peer({
  initiator: location.hash === '#init',
  trickle: false
}
)

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
  console.log(data);
  document.getElementById('messages').textContent += data + '\n';
})

peer.on('stream', function(stream) {
  var video = document.createElement('video')
  document.body.appendChild(video)

  video.src = window.URL.createObjectURL(stream)
  video.play()
})

}).catch(function(error) {
  console.error(err);
})