const nem = require('nem-sdk').default;
const fs = require('fs');
const axios = require('axios');

var endpoint = nem.model.objects.create('endpoint')(
		  nem.model.nodes.defaultTestnet, // Change to "defaultMainnet"
		  nem.model.nodes.defaultPort
		);

var methods ={
	createWallet : function(){
		// Set a wallet name
		var walletName = 'henese';
		//Set a password
		var password = 'Ezchrissy@123';
		// Create PRNG wallet
		var wallet = nem.model.wallet.createPRNG(walletName, password, nem.model.network.data.testnet.id);
		// Convert stringified wallet object to word array
		var wordArray = nem.crypto.js.enc.Utf8.parse(JSON.stringify(wallet));
		// Word array to base64
		var base64 = nem.crypto.js.enc.Base64.stringify(wordArray);

		fs.writeFile(`accounts/${walletName}.wlt`, base64, (err) => {  
	    	if(err) throw err;

		});
		console.log(wallet);
		axios
	},
	createNameSpace : function(){

	},
	createMosaic : function(){
		var privateKey = '7bfb69ab63df2a7ab4c690b206ddc4538dfae07e5cde4919dbe4ff385c6aff2a';
		//var namespaceId = 'Brgy';		
		var mosaicName ='MoneyGram';
		var initialSupply = 1000;
		var divisibility = 2;
		var transferable = true;
		var supplyMutable = true;
		var common = nem.model.objects.create('common')('', privateKey);

		// Get a MosaicDefinitionCreationTransaction object
		var tx = nem.model.objects.get("mosaicDefinitionTransaction");
		// Define the mosaic
		tx.mosaicName = mosaicName;
		tx.namespaceParent = {
             "fqn": "namemoto"
		};
		tx.mosaicDescription = 'My mosaic';

		// Set properties (see https://nemproject.github.io/#mosaicProperties)
		tx.properties.initialSupply = initialSupply;
		tx.properties.divisibility = divisibility;
		tx.properties.transferable = transferable;
		tx.properties.supplyMutable = supplyMutable;
		tx.levy = {};
		//console.log(tx);
	
		// Prepare the transaction object
		var transactionEntity = nem.model.transactions.prepare("mosaicDefinitionTransaction")(common, tx, nem.model.network.data.testnet.id);
		//console.log(transactionEntity);
		nem.model.transactions.send(common, transactionEntity, endpoint).then(function(res){
			console.log(res);
		},
			function(err){
			console.log(err);
		});

	},
	getPrivateKey : function(){
		// Create a common object
		var common = nem.model.objects.create("common")("Ezchrissy@123", "");

		// Get the wallet account to decrypt
		var walletAccount = wallet.accounts[index];

		// Decrypt account private key 
		nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, wallet.algo);

		// The common object now has a private key
		console.log(common)
				
	},
	transferXem : function(){
		//2a41569605f5e4099e257ab587524f546542a01747520476dfab0e7f01470863ca517f6c6de5c457513fa1b20727d3cc'
		//a1b72a2b8b2c51d7aed0214372aca225
		//TBKEOTEOHPNVWLIVO6ENW5EGVTCJSONKI62ZNTYL
		var privateKey = '7bfb69ab63df2a7ab4c690b206ddc4538dfae07e5cde4919dbe4ff385c6aff2a';
		//var privateKey = methods.getPublicKey(); 
		var recipient = 'TCXS6VDVNPYXGWQKNLLREWNKLHECVOCPFBD7L46Y';
		//var recipient ='TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35';
		var amount = 10;
		var message = '10 Bucks for you';

		var common = nem.model.objects.create('common')('', privateKey); // Change your password and privatekey
		var transferTransaction = nem.model.objects.create('transferTransaction')(
		      recipient,
		      amount,
		      message
		);
		var transactionEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id)
		nem.model.transactions.send(common, transactionEntity, endpoint).then(function(res){
			//console.log(privatekeyKey +" " + amount +" " + recipient);
			console.log(res);
			//console.log(transactionEntity);
		},
			function(err){
			console.log(err);
		});
	},
	transferMosaic : function(recipient,quantity,message,mosaicName){
		var privateKey = '7bfb69ab63df2a7ab4c690b206ddc4538dfae07e5cde4919dbe4ff385c6aff2a';
		//var privateKey = methods.getPublicKey(); 
		//var recipient = 'v';
		//var recipient ='TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35';
		var nameSpace ='';
		nem.com.requests.account.mosaics.allDefinitions(endpoint, 'TCPMBZODECCBZVDHVRWWWYQCOYIP5CN5ZHWXAIOG').then(function(res){
			//console.log(res.data[0]);
			for(x=0; x < res.data.length; x++){
				//console.log(res.data[x].id.name);
				//console.log(mosaicName);
				if(res.data[x].id.name === mosaicName){
					nameSpace = res.data[x].id.namespaceId;
					//console.log(nameSpace);
					var common = nem.model.objects.create('common')('',privateKey);
					var transferTransaction = nem.model.objects.create('transferTransaction')(recipient, 0, message);
					var mosaicDefinitions = nem.model.objects.get('mosaicDefinitionMetaDataPair');
					var mosaicAttachment = nem.model.objects.create('mosaicAttachment')(nameSpace, mosaicName, quantity);

					transferTransaction.mosaics.push(mosaicAttachment);
					nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res){
					var definitions = nem.utils.helpers.searchMosaicDefinitionArray(res.data, [mosaicName]);
					var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);

						//console.log(transferTransaction);

					mosaicDefinitions[fullName] = {};
					mosaicDefinitions[fullName].mosaicDefinition = definitions[fullName];

					var preparedTransaction = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
					preparedTransaction.fee = 1000000;

					nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){console.log(res);
					},function(err){
							console.log(err);
					});
					},function(err){
						console.log(err);
					});
					break;
				}
			}
		},function(err){
			console.log(err);
		});
		//console.log(nameSpace);
		//var quantity = 1;
		//var message = 'Mosaic Transfer';
		//var nameSpace ='namemoto';
		//var mosaicName = 'pera';

		
		

	},
	getAccountInfo: function(){
		var address = 'TCPMBZODECCBZVDHVRWWWYQCOYIP5CN5ZHWXAIOG';
		nem.com.requests.account.mosaics.allDefinitions(endpoint, address).then(function(res){
			//console.log(res.data[0]);
			return(res.data);
		},function(err){
			console.log(err);
		});
	},

	getAllInfo: function(output){
		var address = 'TCPMBZODECCBZVDHVRWWWYQCOYIP5CN5ZHWXAIOG';
		output = nem.com.requests.account.transactions.all(endpoint, address).then(function(res) {
			console.log("\nAll transactions of the account:");
			// console.log(res.data[0].meta.hash.data);
			var temp = res.data[0].meta.hash.data;
			// console.log(res.data[0])
			if(address === res.data[0].transaction.recipient){
				return(res.data[0].transaction.recipient);
			}
			else {
				console.log('malaki');
			}
		}, function(err) {
			console.error(err);
		});

		console.log(output);
	}
}
module.exports = methods;