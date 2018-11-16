const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const fs = require('fs');
const store = new SimpleJsonStore('./data.json');
let ws = fs.createWriteStream('secret.txt');

router.post('/',(req,res,next) =>{
	console.log('Log-In page only');
	next();	
	},(req,res) =>{
		const users = store.get('accounts');
		let check = false;
		const inputUser ={
			user: req.body.user,
			pass: req.body.pass,

		};
		console.log(inputUser);
		for(var i = 0; i < users.length; i++) {
			if(inputUser.user == users[i].user && inputUser.pass == users[i].pass){
				console.log('Successfully LogIn');
				ws.write(inputUser.user);
				ws.end();
				check = true;
				//alert('Successfully Login');
				//global.ID = inputUser.id;
				break;
			}
		}
	res.send(check);
});


module.exports = router;