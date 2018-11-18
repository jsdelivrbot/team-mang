(function(){
	console.log("andito?");
	var createAccount = document.getElementById('transfer');
	//console.log(createAccount);
	createAccount.addEventListener('click',function(event){
		console.log("pumasok");
		var recipient = document.getElementById('recipient');
    var quantity = document.getElementById('quantity');
    var message = document.getElementById('message');
    var mosaicName = document.getElementById('mosaicName');
    console.log(mosaicName.value);
		axios.post('http://localhost:3000/api/transfer',{ recipient: recipient.value, quantity: quantity.value, message: message.value, mosaicName: mosaicName.value})
			.then(function(res){
				if(res.data.recipient !== null && res.data.quantity !== null){
					alert('Successfully Signup your ID:'+" "+ res.data.recipient +" "+"Pin:"+" "+ res.data.quantity);
				}
				else
					alert('Registration Failed\n' +'Try Again');
				
			})
			.catch(function(err){
				console.log(err);
			});
	});//end of var createAccount

})();