// ---- require
var express = require('express');
var path = require('path');
var app = express();
var shopifyAPI = require('shopify-node-api');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
// ---- end require
app.use(express.static(path.join(__dirname, './client/static')));






// ---- start Shopify
var Shopify = new shopifyAPI({
    shop: 'MYSHOP', // MYSHOP.myshopify.com
    shopify_api_key: '', // Your API key
    access_token: '', // Permanent token
    shopify_scope: 'write_products'
});
// ---- end Shopify






// ---- start config
require('./config/rails.js');
require('./config/routes.js')(app, Shopify);
// ----	end config





// ---- start server
var port = process.env.PORT || 8888;
var server = app.listen(8888, function(){
	console.log("Entering realm 8888..");
});
// ---- end server