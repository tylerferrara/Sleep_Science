const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send("we are in the scale get route...... LETS SEND SOME DATA")
});

router.post('/', (req, res) => {
    const alarmTime = req.body.queryResult.parameters.time;
    setTimer(alarmTime);
    res.send('POST has been recieved!!!')
});

function setTimer(alarmTime) {
    const dateObj = new Date(alarmTime) - new Date();
    console.log(dateObj.valueOf());
    setTimeout(() => {
        console.log("Lets sound the alarm!!!")
        // What to run when timer is up!
        // Call your phone and LET IT RINGGGG!!!!!
    }, dateObj.valueOf());
}

module.exports = router;
