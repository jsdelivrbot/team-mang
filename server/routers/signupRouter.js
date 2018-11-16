const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json');

router.post('/',(req,res,next) =>{
	const users = store.get('accounts');
	let check = false;
	
    
	const input ={
		user : req.body.user,
		pass : req.body.pass
	}
	const data ={
		user : input.user,
		pass : input.pass
	};
	if(input.user !== "" || input.user !== "" && input.pass !== "" || input.pass !==""){
		users.push(data);
		store.set('accounts',users);
		
		res.json({user:data.user, pass:data.pass});
	}
	else
		res.json({user:null, pass:null});
	//alert(`Successfully Signup your ID: ${data.id} Pin: ${data.pin} `);
});


module.exports = router;