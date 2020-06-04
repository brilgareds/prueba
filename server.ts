let exp = require('express'),
  app = exp(),
  port = process.env.PORT || 8001;
var bodyParser = require('body-parser');



app.use(bodyParser.json());
app.listen(port);

let index = require('./api/routes/index');
let users = require('./api/routes/users');
let products = require('./api/routes/products');
let categories = require('./api/routes/categories');

app.use('/', index);
app.use('/users', users);
app.use('/products', products);
app.use('/categories', categories);