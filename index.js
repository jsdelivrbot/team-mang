const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();
const axios = require('axios');

//Routers require
const indexRouter = require('./server/routers/indexRouter');
const signinRouter = require('./server/routers/signinRouter');
const signupRouter = require('./server/routers/signupRouter');
const transferRouter = require('./server/routers/transferRouter');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
	req.viewModel ={
		title : 'TeamMang'
	};
	next()
});

//html file path
app.set('views', __dirname + '/server/views');
app.engine('html', require('ejs').renderFile);

// app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use('/',indexRouter);
app.use('/api/signIn',signinRouter);
app.use('/api/signUp',signupRouter);
app.use('/api/transfer',transferRouter);


app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  console.log();
});