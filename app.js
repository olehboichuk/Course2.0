const {Client} = require('pg');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
let path = require('path');
const express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;

let UsersController = require('./backend/handlers/UsersController.js');
let LanguagesControler = require('./backend/handlers/LanguagesControler.js');
let AuthController = require('./backend/auth/AuthController.js');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());
app.use('/api', UsersController);
app.use('/api', AuthController);
app.use('/api', LanguagesControler);

// Create link to Angular build directory
app.use(express.static(__dirname + '/dist/frontend'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port 3000');
});

const client = new Client({
    connectionString: 'postgres://avzgegtvqfqmpx:39255c33de31232f84ea8d2e6a3053c226b0f1517fc1ededdd863b40037e1c9b@ec2-54-159-112-44.compute-1.amazonaws.com:5432/d3v6s6o400cft2',
    ssl: true,
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
