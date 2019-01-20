const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send("we are in the scale get route...... LETS SEND SOME DATA")
});

router.post('/', (req, res) => {
    console.log(req.body);
    let topLeft = req.body.top-left;
    let topRight = req.body.top-right;
    let bottomRight = req.body.bottom-right;
    let bottomLeft = req.body.bottom-left;

    res.send('POST has been recieved!!!')
});

module.exports = router;
