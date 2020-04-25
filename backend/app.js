const {Client} = require('pg');
const express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;

let UsersController = require('./handlers/UsersController.js');
let LanguagesControler = require('./handlers/LanguagesControler.js');
let AuthController = require('./auth/AuthController.js');

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', UsersController);
app.use('/api', AuthController);
app.use('/api', LanguagesControler);

app.listen(port, () => {
    console.log('Server started on port 3000');
});

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'coursework',
//     password: 'Qwerty123_',
//     port: 5432,
// });
const client = new Client({
    connectionString: 'postgres://dssiijshzfihym:0f4f3ce480de8fdd1bd48e6e9c6190da2294dd9fe8723dd1c574d9e8a9aaf868@ec2-79-125-26-232.eu-west-1.compute.amazonaws.com:5432/d27fhgsoesbl2l',
    ssl: true,
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

