var Product = require('../models/product');

var mongoose = require('mongoose');

const mongoose_url = 'mongodb+srv://db-user:pWjEZSXDugVn3QEs@cluster0-csd2h.mongodb.net/test?retryWrites=true&w=majority';
    
mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
  });


var products = [
    new Product({
    imagePath:'https://im.mtv.fi/image/5935814/landscape16_9/1024/576/574d2764d0e46b86a28846de55f6ed96/OJ/shutterstock-17038576.jpg',
    title: 'Banaani',
    description: 'hedelmä',
    price: 1
}),
    new Product({
        imagePath:'https://pixnio.com/free-images/2017/09/19/2017-09-19-06-55-30-1031x825.jpg',
        title: 'Omena',
        description: 'hedelmä',
        price: 2
}),
new Product({
    imagePath:'https://www.paivanlehti.fi/content/uploads/Ruisleip%C3%A4-20012017-Fotolia-e1484905307918-825x433.jpg',
    title: 'Ruisleipä',
    description: 'leipä',
    price: 5
})
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}
function exit(){
    console.log('Products saved to Mongo Database.');
    mongoose.disconnect();
}