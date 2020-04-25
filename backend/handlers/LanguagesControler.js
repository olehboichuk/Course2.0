let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
const sqlLanguages = require('../queryes/language');
const sqlTopics = require('../queryes/topic');
const sqlArticles = require('../queryes/article');

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

router.route('/languages')
    .get((req, res) => {
        pool.query(sqlLanguages.find_all_languages, (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/topics')
    .get((req, res) => {
        pool.query(sqlTopics.get_all_topics, (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/articles')
    .get((req, res) => {
        pool.query(sqlArticles.find_all_articles, (err, result) => {
            if (err) throw err;
            let articles = result.rows;
            let i = 0;
            articles.forEach(el => {
                pool.query(sqlArticles.get_article_topics, [el.id], (err, topic) => {
                    if (err) return res.status(500).send({message: 'Error on the server.'});
                    el.topics = topic.rows;
                    if (articles.length - 1 === i) {
                        res.status(200).json(articles)
                    }
                    i++;
                });
            });
        });
    })
    .post((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        let articleCreate = new Date();
        pool.query(sqlArticles.insert_new_article, [id, req.body.title, req.body.content, articleCreate.toLocaleString()], (err, result) => {
            if (err) throw err;
            let articleId = result.rows[0].id;
            req.body.topicIds.forEach(el => {
                pool.query(sqlArticles.add_topic_to_article, [articleId, el], (err, result) => {
                    if (err) return res.status(500).send({message: 'Error on the server.'});
                    if (req.body.topicIds[req.body.topicIds.length - 1] === el)
                        res.status(200).json(result.rows)
                });
            })
        });
    })
    .put((req, res) => {
        pool.query(sqlArticles.upd_article, [req.body.title, req.body.content, req.body.id], (err, result) => {
            if (err) throw err;
            if (req.body.topicIds) {
                pool.query(sqlArticles.remove_article_topics, [req.body.id], (err, result) => {
                    if (err) return res.status(500).send({message: 'Error on the server.'});
                    req.body.topicIds.forEach(el => {
                        pool.query(sqlArticles.add_topic_to_article, [req.body.id, el], (err, result) => {
                            if (err) throw err;
                            if (req.body.topicIds[req.body.topicIds.length - 1] === el)
                                res.status(200).json(result.rows)
                        });
                    });
                });
            } else {
                res.status(200).json(result.rows)
            }
        });
    });

router.route('/articles/:id')
    .get((req, res) => {
        pool.query(sqlArticles.find_article_by_id, [req.params.id], (err, result) => {
            if (err) return res.status(500).send({message: 'Error on the server.'});
            pool.query(sqlArticles.get_article_topics, [req.params.id], (err, topic) => {
                if (err) return res.status(500).send({message: 'Error on the server.'});
                try {
                    result.rows[0].topics = topic.rows;
                } catch (e) {
                    return res.status(500).send({message: 'Can\'t find article with ID = ' + req.params.id});
                }
                res.status(200).json(result.rows)
            });

        });
    })
    .delete((req, res) => {
        pool.query(sqlArticles.remove_article, [req.params.id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

module.exports = router;
