const express = require('express');
const router = express.Router(); //eslint-disable-line
const process = require('./processRouter');
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./trans.json');

router.get('/',(req,res) =>{
    process.getAllInfo();
    const users = store.get('transactions');
    res.json(users);
});


module.exports = router;