const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

// app.engine('hbs', expressHbs({
//     layoutsDir : 'views/layouts',
//     defaultLayout : 'main-layout',
//     extname : 'hbs'
// }));
// app.set('view engine', 'hbs');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0], result[1]);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //for serving static files

app.use('/admin', adminRouter); 
app.use(shopRouter);

app.use(errorController.get404Page);

app.listen(3000);