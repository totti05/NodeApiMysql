const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes

require('./routes/userRoutes.js')(app); 

//static files

app.listen(app.get('port'), ()=> {
	console.log('server on port: 3000');
})


