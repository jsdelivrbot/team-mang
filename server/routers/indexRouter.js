const express = require('express');
const router = express.Router(); //eslint-disable-line
const fs = require('fs');
const process = require('./processRouter');

router.get('/', function getIndexPage(req, res) {
	res.render('login.html');

	//process.transferMosaic('TCPMBZODECCBZVDHVRWWWYQCOYIP5CN5ZHWXAIOG',1,'message','pera');
});

//add new Member
router.get('/home', function gethomePage(req,res){
	// var file = '';
	// try{
	// 	file = fs.readFileSync('secret.txt', 'utf8');
	// }
	// catch(e){
	// 	console.log('Error:', e.stack);
	// }
	// if(file !== null){

	// 	if(file === 'cheche'){
	// 		res.render('home.html');
	// 	}
	// 	else if(file !== 'cheche'){
	// 		res.render('home2.html');
	// 	}
	// }
	res.render('home.html');
});

router.get('/home2', function gethomePage(req,res){
	res.render('home2.html');
})

//transfer Mosaic
router.get('/transfer', function gethomePage(req,res){
	res.render('transfer.html');
});

//deposit
router.get('/deposit', function gethomePage(req, res){
	res.render('deposit.html');
});

//withdraw
router.get('/withdraw', function gethomePage(req, res){
	res.render('withdraw.html');
});

module.exports = router;