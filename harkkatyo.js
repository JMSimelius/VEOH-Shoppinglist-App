const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth_controller');
const shoppinglist_controller = require('./controllers/shoppinglist_controller');

let app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/public/stylesheet', express.static('css'))

//Auth
app.use('/', auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);

// Shopping listit
app.get('/', is_logged_handler, shoppinglist_controller.get_shoppinglists);
app.post('/add-shoppinglist', is_logged_handler, shoppinglist_controller.post_shoppinglist);
app.post('/delete-shoppinglist', is_logged_handler, shoppinglist_controller.delete_shoppinglist);
app.get('/shoppinglists/:id', is_logged_handler, shoppinglist_controller.get_shoppinglist);
app.post('/add-product', is_logged_handler, shoppinglist_controller.post_product);


app.use((req, res, next) => {
    res.status(404);
    res.send(`
        PAGE IS NOT FOUND!
    `);
});
//Shutdown server CTRL + C in terminal
    
    const mongoose_url = 'mongodb+srv://db-user:pWjEZSXDugVn3QEs@cluster0-csd2h.mongodb.net/test?retryWrites=true&w=majority';
    
    mongoose.connect(mongoose_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Mongoose connected');
        console.log('Start Express server');
        app.listen(PORT);
    });
