var express = require('express');
var router = express.Router();
var chain = require('chain-wallets-node');
var bitcoin = require('bitcoinjs-lib')

var walletPrivKey_1 = 'tprv8ZgxMBicQKsPewM6iYCmr6Aa1zhgRK12xvFSCag4W3drwVqux6hzAgmfTQQQjBW4TA2CKw8KxT59AcQEiantikCGz2eG6RMkayS3jNBHmBE';
var walletPrivKey_Main2 = 'xprv9s21ZrQH143K4TxfiCJxmvTC3CGqpKyfB5fi8npJXeWqkZimjbpNTnxaJBmuoRAWLCBZE3afhuvkMbQMaRDzHafBZkEGQMtjibZwjBcyXyq';



var c = new chain.Client({
  apiTokenId: 'e64af205c25109cac2d642a49db80489',
  secretApiToken: '5e3aec615fad90283d67d327abd74eeb'
});
var walletPrivKey = 
c.keyStore.add(new chain.Xprv(
	//process.env.XPRV, true
	walletPrivKey_1
	, true
));

// /chain1... prints wallet JSON
router.get('/chain1', function(req, res) {
	/* fetch data from  sdk*/
	c.getWallet('a6259240-8cbc-4add-a6a7-3df57e631645', function(err, resp) {
	  //console.log('label=' + resp.label);
	  res.render('chain1', {content: JSON.stringify(resp)});
	});
});

router.get('/transferAssetAtoB', function(req, res) {
	// transfer some BTC from bucket A to bucket B
	/*
		use transact()
		takes...
			buildParams = {
				inputs = [bucketID, amount]
				,outputs = [bucketID, amount]
				,metadata = ?
			}
			,cb = function() {}
		inputs would be...
			A's id and amount
			B's id and amount

	*/
	var buildParams = {
		inputs: [
		    {
		      //asset_id: "ASVqpHL9MdAjioe9cG7R3fsdZ47xC18zZv",
		      bucket_id: "53749500-4722-4676-916b-c15cfa21d49d", // bucket A
		      amount: 1000
		    }
		  ],
		  outputs: [
		    {
		      //asset_id: "ATqhPFyJHmTMgaYURHswAojJWM8dJSxFdD",
		      bucket_id: "1b8b93a9-97a4-448b-a6b8-a28cdd13dd30", // buck B
		      amount: 1000
		    }
		  ],
		  metadata : "" // no metadata here - initial funding
	};
	var cb = function(err, response){ 
		console.log(err)
		console.log(response)
		return 'hello...s'
	};
	c.transact(
		buildParams
		,cb
	);
	// call SDK to get asset based on ID
	res.render('chain1', {content: 'executing transact()...'});
});

router.get('/transferAssetAtoC', function(req, res) {
	// transfer some BTC from bucket A to bucket C
	var buildParams = {
		inputs: [
		    {
		      //asset_id: "ASVqpHL9MdAjioe9cG7R3fsdZ47xC18zZv",
		      bucket_id: "53749500-4722-4676-916b-c15cfa21d49d", // bucket A
		      amount: 1000
		    }
		  ],
		  outputs: [
		    {
		      //asset_id: "ATqhPFyJHmTMgaYURHswAojJWM8dJSxFdD",
		      bucket_id: "714ffe38-5bfc-47b0-b47f-e3cf3d58ccac", // bucket C
		      amount: 1000
		    }
		  ],
		  metadata : "" // no metadata here - initial funding
	};
	var cb = function(err, response){ 
		console.log(err)
		console.log(response)
		return 'hello...s'
	};
	c.transact(
		buildParams
		,cb
	);
	// call SDK to get asset based on ID
	res.render('chain1', {content: 'executing transact()...'});
});

// var getIDFromTransactionMetadata(transactionHash) {
// 	var txn = c.;
// };

// print event based on hash ID
router.get('/showEvent', function(req, res) {
	// get asset ID from request
	var assetID = 'todo';
	// call SDK to get asset based on ID
	res.render('showEvent', {content: 'todo'})
});

router.get('/getInfoFromTxHash/:txHash', function(req, res) {
	// if() {
	// }
	// txHash = 'eaf39ff4853216e1b2e0aac087ada1ccbebec6a7891f768843cef2b39234f954'
	// var metadata = chain.getTransactionOpReturn(txHash);
    // var tx = bitcoin.Transaction.fromHex(req.params.txHash);
	// call SDK to get asset based on ID
	res.render('chain1', {
		// content: JSON.stringify(tx)
		content: req.params.txHash
	});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to our decentralized credit bureau / reputation system :)' });
});


/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});


module.exports = router;
