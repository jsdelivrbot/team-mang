const express = require('express');
const router = express.Router(); //eslint-disable-line

const process = require('./processRouter');

router.get('/', function getIndexPage(req, res) {
	res.render('login.html');
	//process.transferMosaic('TCPMBZODECCBZVDHVRWWWYQCOYIP5CN5ZHWXAIOG',1,'message','pera');
});

router.get('/home', function gethomePage(req,res){
	res.render('home.html');
});

router.get('/transfer', function gethomePage(req,res){
	res.render('transfer.html');
});

module.exports = router;