let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
const sqlLanguages = require('../queryes/language.js');
const sqlTopics = require('../queryes/topic.js');
const sqlArticles = require('../queryes/article.js');
const sqlLessons = require('../queryes/lesson.js');

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
      if (articles.length === 0) {
        res.status(200).json(articles)
      }
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

router.route('/lessons/:id')
  .get((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(sqlLessons.get_display_lesson_by_id, [id, req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows[0])
    });
  })
  .delete((req, res) => {
    pool.query(sqlLessons.set_terminated_to_lessons, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows[0])
    })
  });

router.route('/lessons')
  .get((req, res) => {
    pool.query(sqlLessons.get_all_lessons, (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows)
    });
  })
  .post((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(sqlLessons.insert_new_lesson, [id,
      req.body.id_language,
      req.body.id_topic,
      req.body.title,
      req.body.start_time,
      req.body.duration_minutes,
      req.body.min_attendees,
      req.body.max_attendees,
      req.body.description], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows)
    });
  })
  .put((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(sqlLessons.update_lesson, [id,
      req.body.id_language,
      req.body.id_topic,
      req.body.title,
      req.body.start_time,
      req.body.duration_minutes,
      req.body.min_attendees,
      req.body.max_attendees,
      req.body.description,
      req.body.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows)
    });
  });

router.route('/lessons/join/:id')
  .get((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(sqlLessons.add_user_to_lesson, [req.params.id, id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows)
    });
  }).delete((req, res) => {
  let token = req.header('x-access-token');
  let id = jwt.decode(token).id;
  pool.query(sqlLessons.remove_user_from_lesson, [req.params.id, id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows)
  });
})

let minutes = 15, the_interval = minutes * 60 * 1000;
setInterval(function() {
  pool.query(sqlLessons.set_cancelled_to_lessons, [new Date().toUTCString()], (err, result) => {
    if (err) throw err;
  });
}, the_interval);

module.exports = router;
