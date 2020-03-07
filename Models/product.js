var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   imagePath: {type: String, required: true}, 
   title: {type: String, required: true},
   quantity: {type: Number, required: true}
});
const product_model = mongoose.model('product', schema);
module.exports = product_model;