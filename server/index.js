const express = require('express');
const app = express();
const server = require('http').createServer(app); 
const io = require('socket.io')(server);
const request = require('request');
const bodyParser = require('body-parser');
const player = require('play-sound')(opts = {})

let audio;
let lastTotalWeight = 0;
let totalWeight;

app.use(bodyParser.json());

const scale = require('./scale.js');
const webhook = require('./webhook.js');

let dateTarget;

let playAlarm = false;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


let listenToScale = true;

app.get('/motion', (req, res) => {
  console.log('Someone is in front of that camera!!!')
  // playAlarm = true;
  request('http://130.215.111.210:5000/turnOff')
  res.send('hi');
});

app.post('/scale', (req, res) => {
  if (listenToScale) {
    const threshHold = 5;
    console.log(req.body);
    let topLeft = req.body.TopLeft;
    let topRight = req.body.TopRight;
    let bottomRight = req.body.BottomRight;
    let bottomLeft = req.body.BottomLeft;
    totalWeight = req.body.TotalWeight;
    console.log("Yeah here is the bottm" + bottomRight)
    if (totalWeight > threshHold) {
      if (playAlarm) {
        turnOffAlarm();
      }
    }
    lastTotalWeight = totalWeight;
  }
  res.send('POST has been recieved!!!')
});

function turnOffAlarm() {
  // io.emit('turnOffAlarm');
  // audio.kill();
  console.log('switching off alarm.....')
  request('http://130.215.111.210:5000/turnOff')
  // try {

  //   audio.kill();
  // } catch {

  // }
  totalWeight = 0;
  playAlarm = false;
}

function setTimer(dateTarget, soc) {
  const dateObj = dateTarget - new Date();
  console.log(dateObj.valueOf());
  setTimeout(() => {
      console.log("Lets sound the alarm!!!")
      // What to run when timer is up!
      // Call your phone and LET IT RINGGGG!!!!!
      console.log('lets BLOW THIS ALARM UP!!!!')
      // soc.emit('playAlarm', { play: true })
      playAlarm = true;
      sawFirstMotion = false;
      request('http://130.215.111.210:5000/turnOn')
      // audio = player.play('alarmSound.mp3', (err) => {
      // });
  }, dateObj.valueOf());
}

app.post('/webhook', (req, res) => {

});

io.on('connection', (socket) => {
  console.log("we are connected to the socket!!!!!")
  socket.emit('bono', { b: 'till'})
  socket.on('setAlarm', (time) =>
   {
    dateTarget = new Date();
    dateTarget.setHours(time.hour)
    dateTarget.setMinutes(time.minute)
    dateTarget.setSeconds(0)
    dateTarget.setMilliseconds(0)
    setTimer(dateTarget, socket);
  })
});

io.on('setAlarmTime', (data) => {
  console.log('TIME TO SET THE ALARM!!!');
})



server.listen(8080, () => {
  const port = server.address().port;
  console.log(`Example app listening on port: ${port}`);
});




