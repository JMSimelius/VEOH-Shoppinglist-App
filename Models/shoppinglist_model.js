const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopping_list_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        req: true
    }]
});
const shopping_list_model = mongoose.model('shoppinglist', shopping_list_schema);
module.exports=shopping_list_model;