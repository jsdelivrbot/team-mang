const express = require('express');
const router = express.Router(); //eslint-disable-line
const process = require('./processRouter');

router.post('/',(req,res) =>{
    console.log('pumasok ulit');
    const input ={
		recipient : req.body.recipient,
        quantity : req.body.quantity,
        message : req.body.message,
        mosaicName : req.body.mosaicName
    };

    process.transferMosaic(input.recipient, input.quantity, input.message, input.mosaicName);
});


module.exports = router;