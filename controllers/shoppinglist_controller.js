const shopping_list_model = require('../Models/shoppinglist_model');
const shoppinglist_views = require('../views/shoppinglist_views');

const product_model = require('../models/product');

const get_shoppinglists = (req, res, next) => {
    const user = req.user;
    user.populate('shoppinglists').execPopulate()
    .then(() => {
        let data = {
            user_name: user.name,
            shoppinglists: user.shoppinglists
        };
        console.log(data.user_name);
        console.log(data.shoppinglists);
            let html = shoppinglist_views.shoppinglists_view(data);
            res.send(html);
        });
};



const get_shoppinglist = (req, res, next) => {
    const id = req.params.id;
    shopping_list_model.findOne({
        _id: id
    }).then((shoppinglist) => {
        shoppinglist.populate('products')
        .execPopulate()
        .then(() => {
            let data = {
                shoppinglist: shoppinglist
                
            };
            console.log(data);
            let html = shoppinglist_views.shoppinglist_view(data);
            res.send(html);
        });
    });
};
const post_shoppinglist = (req, res, next) => {
    const user = req.user;
    //const data = JSON.stringify(req.body);
    //const { shoppinglist_id } = data;
    let new_shoppinglist = shopping_list_model({
        name: req.body.name,
        products: req.body.products
    });
    new_shoppinglist.save().then(() => {
        console.log(new_shoppinglist);
        console.log('shoppinglist saved');
        user.shoppinglists.push(new_shoppinglist);
        console.log(user.shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
}

const delete_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id_to_delete = req.body.shoppinglist_id;

    //Remove shoppinglist from user.notes
    const updated_shoppinglists = user.shoppinglists.filter((shoppinglist_id) => {
        return shoppinglist_id != shoppinglist_id_to_delete;
    });
    user.shoppinglists = updated_shoppinglists;

    //Remove shoppinglist object from database
    user.save().then(() => {
        shopping_list_model.findByIdAndRemove(shoppinglist_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const post_product = (req, res, next) => { 
    //res.JSON(req.body)
    
//var stringified = JSON.stringify(req.body);
//var shoppinglist_id = JSON.parse(JSON.stringified);
 
//console.log(shoppinglist_id);
    //const data = JSON.parse(req.body);
    //const data = jQuery.parseJSON(JSON.stringify(data));
    //const data = JSON.parse(JSON.stringify(req.body));
    //const { shoppinglist_id } = data;
    //console.log(data);
    //const data = req.body;
    //const { shoppinglist_id } = data;
    //const user = req.user;
    const shoppinglist_id = req.body.shoppinglist_id;
    const title = req.body.title;
    const imagePath = req.body.imagePath;
    const quantity = req.body.quantity;
    
    //const products = req.body.products;
    

    let new_product = product_model({
        title: title,
        imagePath: imagePath,
        quantity: quantity
    });
    //const data = JSON.parse(req.body.slice(17).trim())
    //var stringified = JSON.stringify(req.body);
//    var shoppinglist_id = JSON.parse(JSON.stringify(req.body));
    //console.log(shoppinglist_id);
    new_product.save().then(() => {
        shopping_list_model.findOne({
            _id: shoppinglist_id
        }).then((shoppinglist) => {
            shoppinglist.products.push(new_product);
        shoppinglist.save().then(() => {
            res.redirect(`/shoppinglists/${shoppinglist_id}`);
        });
        });

        // user.shoppinglist_id['products'].push(new_product);
        // console.log('product saved');
        // user.save().then(() => {
        //     return res.redirect('/');
        // });
    });
}

        //shoppinglists.findByIdAndUpdate({shoppinglist_id: req.shoppinglist.id}, {$push: {products: new_product}});

        // {safe: true, upsert: true},
        // function(err, new_product) {
        //     if (err) {
        //         console.log('eipä onnistunu');
        //     }
        // })

module.exports.get_shoppinglists = get_shoppinglists;
module.exports.get_shoppinglist = get_shoppinglist;
module.exports.post_shoppinglist = post_shoppinglist;
module.exports.delete_shoppinglist = delete_shoppinglist;
module.exports.post_product = post_product;