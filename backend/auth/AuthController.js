let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
const {Pool} = require('pg');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const sql = require('../queryes/user');
let config = require('../config');
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'coursework',
//     password: 'Qwerty123_',
//     port: 5432,
// });
const pool = new Pool({
    connectionString: 'postgres://dssiijshzfihym:0f4f3ce480de8fdd1bd48e6e9c6190da2294dd9fe8723dd1c574d9e8a9aaf868@ec2-79-125-26-232.eu-west-1.compute.amazonaws.com:5432/d27fhgsoesbl2l',
    ssl: true,
});

router.post('/register', function (req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let roles = '{'
    if (req.body.role) {
        req.body.role.forEach(el => {
            roles += el + ',';
        })
        roles = roles.substring(0, roles.length - 1);
    }
    roles += '}';
    let language_ids = '{'
    if (req.body.languageIds) {
        req.body.languageIds.forEach(el => {
            language_ids += el + ',';
        })
        language_ids = language_ids.substring(0, language_ids.length - 1);
    }
    language_ids += '}';
    pool.query(sql.createUser, [req.body.login, req.body.email, hashedPassword, req.body.first_name, req.body.last_name, req.body.about, roles, language_ids], (err, result) => {
        if (err) return res.status(500).send({message: "There was a problem registering the user."});
        if (!result.rows[0]) return res.status(404).send({message: "User already exists."});
        res.status(200).send({message: "User success added."});
    });
});

router.post('/login', function (req, res) {
    pool.query(sql.find_user_with_login, [req.body.login], (err, result) => {
        if (err) return res.status(500).send({message:'Error on the server.'});
        if (!result.rows[0]) return res.status(404).send({message:'No user found.'});
        let passwordIsValid = bcrypt.compareSync(req.body.password, result.rows[0].password);
        if (!passwordIsValid) return res.status(401).send({message:'Login or password incorrect.'});
        let token = jwt.sign({id: result.rows[0].id}, config.secret, {
            expiresIn: 83600 // expires in 1 hour
        });
        let tokenCreate = new Date();
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }
        tokenCreate.addHours(1);
        tokenCreate = tokenCreate.toLocaleString();
        res.status(200).send({auth: true, token: token, role: result.rows[0].role, expiresIn: tokenCreate, active:result.rows[0].active});
    });
});

router.get('/logout', function (req, res) {
    res.status(200).send({auth: false, token: null});
});

module.exports = router;
