let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
const sql = require('../queryes/user.js');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'coursework',
//     password: 'Qwerty123_',
//     port: 5432,
// });

const pool = new Pool({
  connectionString: 'postgres://avzgegtvqfqmpx:39255c33de31232f84ea8d2e6a3053c226b0f1517fc1ededdd863b40037e1c9b@ec2-54-159-112-44.compute-1.amazonaws.com:5432/d3v6s6o400cft2',
  ssl: true,
});

router.route('/user/profile/:id')
    .get((req, res) => {
        pool.query(sql.find_user_with_id, [req.params.id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/user/profile')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_user_with_id, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    })
    .put((req, res) => {
        pool.query(sql.change_student, [req.body.first_name, req.body.last_name, req.body.email, req.body.about, req.body.id], (err, result) => {
            if (err) throw err;
            if (req.body.languageIds) {
                pool.query(sql.remove_user_languages, [req.body.id], (err, result) => {
                    if (err) throw err;
                    req.body.languageIds.forEach(el => {
                        pool.query(sql.insert_user_language, [req.body.id, el], (err, result) => {
                            if (err) throw err;
                            if (req.body.languageIds[req.body.languageIds.length - 1] === el)
                                res.status(200).json(result.rows)
                        });
                    });
                });
            } else {
                res.status(200).json(result.rows)
            }
        });
    })
    .delete((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.deactivate_by_user_id, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/user/role')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_user_roles, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/user/languages')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_languages_by_user_id, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/user/languages/:id')
    .get((req, res) => {
        pool.query(sql.find_languages_by_user_id, [req.params.id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });
router.route('/user/subscriptions')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_subscriptions_by_user_id, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/user/subscriptions/:id')
    .get((req, res) => {
        pool.query(sql.find_subscribers_of_teacher_by_his_id, [req.params.id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });
router.route('/user/:id/subscribe')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.subscribe_to_teacher, [req.params.id, id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    })
    .delete((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.unsubscribe_from_teacher, [req.params.id, id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/languages')
    .get((req, res) => {
        pool.query(sql.find_all_languages, (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

module.exports = router;
