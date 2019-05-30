const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require('express-handlebars');

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
//const db = require('./util/database');
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

// app.engine('hbs', expressHbs({
//     layoutsDir : 'views/layouts',
//     defaultLayout : 'main-layout',
//     extname : 'hbs'
// }));
// app.set('view engine', 'hbs');
//app.set('view engine', 'pug');
app.set("view engine", "ejs");
app.set("views", "views");

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0], result[1]);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //for serving static files

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  //.sync({ force: true }) // force to overwrite every tables and everything
  .sync()
  .then(result => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Sarfaraz", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    //console.log(user);
    app.listen(3000);
  })
  .catch(err => console.log(err));
