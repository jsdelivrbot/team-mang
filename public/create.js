(function(){

	console.log("andito?");
	var createAccount = document.getElementById('createAccount');
	//console.log(createAccount);
	createAccount.addEventListener('click',function(event){
		console.log("pumasok");
		var user = document.getElementById('user');
		var pass = document.getElementById('pass');
		console.log(user.value);
		console.log(pass.value);
		axios.post('http://localhost:3000/api/signUp',{ user: user.value, pass: pass.value})
			.then(function(res){
				if(res.data.user !== null && res.data.pass !== null){
					alert('Successfully Signup your ID:'+" "+ res.data.user +" "+"Pin:"+" "+ res.data.pass);
				}
				else
					alert('Registration Failed\n' +'Try Again');
				
			})
			.catch(function(err){
				console.log(err);
			});
	});//end of var createAccount

})();