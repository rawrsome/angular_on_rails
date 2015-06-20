module.exports = function(app, Shopify) {
	app.get('/products', function(req, res) {
		Shopify.get('/admin/products.json', function(err, data, headers) {
			// console.log(data); // Data contains product json information
			// console.log(headers); // Headers returned from request
		    // products.show(data, headers);
		    res.json(data);	    
		});
	})

	app.get('/products/:id', function(req, res) {
		Shopify.get('/admin/products.json', function(err, data, headers) {
			console.log(res.json(data));
		});
	})
};