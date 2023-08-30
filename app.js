const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");
const ErrorController = require("./controllers/error");
const ConsoleController = require("./controllers/console");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(ConsoleController.LOG_Request);

app.use('/admin' , adminRoutes.Router);
app.use('/', userRoutes.Router);

app.use(ConsoleController.LOG_Error);
app.use(ErrorController.SEND_ERROR);

app.listen(3000);

console.log("\n\nServer Successfully Started.\n");


