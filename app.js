const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //for serving static files

app.use('/admin', adminData.routes); 
app.use(shopRouter);

app.use((req, res, next) => {
    res.render('404', {pageTitle : 'Page Not Found', path : '/abc'});
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    // res.status(404).send('<h2>Page not found</h2>');
});

app.listen(3000);