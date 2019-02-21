let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productchena = new Schema({
	'productId':String,
	'productName':String,
	'salePrice':Number,
	'productImage':String,
	'checked':String,
	'productNum':Number
});

module.export = mongoose.model('good',productSchena);
