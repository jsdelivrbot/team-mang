const express = require('express');
const router = express.Router(); //eslint-disable-line
const process = require('./processRouter');

router.post('/',(req,res) =>{
    const input ={
		recipient : req.body.recipient
    };

    process.getAllInfo(input.recipient);
});


module.exports = router;