let insert_new_article = 'INSERT INTO articles (id_author, id_title, contents, time_posted) VALUES ($1, $2, $3, $4) RETURNING id';
let upd_article = 'UPDATE articles set id_title = $1, contents=$2 WHERE id= $3';
let remove_article_topics = 'delete from articles_topics where id_article = $1';
let add_topic_to_article = 'INSERT INTO articles_topics (id_article, id_topic) VALUES ($1, $2)';
let find_article_by_id = 'SELECT a.id, a.id_author, a.id_title, a.contents, a.time_posted, ' +
    'u.login AS  teacher_login, u.first_name AS teacher_first_name, u.last_name AS  teacher_last_name, ' +
    'u.rate AS  teacher_rate, u.num_rates AS  teacher_num_rates ' +
    'FROM articles a INNER JOIN users u on a.id_author = u.id ' +
    'WHERE a.id=$1';
let remove_article = 'DELETE FROM articles WHERE id = $1';
let get_article_topics = 'SELECT t.name, t.id ' +
    'FROM topics t ' +
    'WHERE EXISTS ' +
    '(SELECT * FROM articles_topics at ' +
    'WHERE at.id_topic = t.id AND at.id_article = $1)';
let find_all_articles = 'SELECT a.id, a.id_author, a.id_title, a.contents, a.time_posted, ' +
    'u.login AS teacher_login, u.first_name AS teacher_first_name, u.last_name AS teacher_last_name, ' +
    'u.rate AS teacher_rate, u.num_rates AS teacher_num_rates ' +
    'FROM articles a INNER JOIN users u on a.id_author = u.id ' +
    'ORDER BY a.time_posted DESC ';
let find_all_articles_by_pages = 'SELECT a.id, a.id_author, a.id_title, a.contents, a.time_posted, ' +
    'u.login AS  teacher_login, u.first_name AS  teacher_first_name, u.last_name AS  teacher_last_name, ' +
    'u.rate AS  teacher_rate, u.num_rates AS  teacher_num_rates ' +
    'FROM articles a INNER JOIN users u on a.id_author = u.id ' +
    'LIMIT $1 ' +
    'OFFSET $2';
let find_all_articles_count = 'SELECT COUNT(*) FROM articles';
let find_article_commentaries = 'SELECT c.id, c.id_author, c.id_article, c.contents, c.time_posted, ' +
    'u.login AS author_login ' +
    'FROM comments c INNER JOIN users u on c.id_author = u.id ' +
    'WHERE c.id_article = $1 ' +
    'ORDER BY c.time_posted DESC';
let insert_new_commentary = 'INSERT INTO comments (id_author, id_article, contents, time_posted) VALUES ($1, $2, $3, $4)';
let remove_commentary = 'DELETE FROM comments WHERE id = $1';

module.exports = {
    insert_new_article,
    remove_article_topics,
    upd_article,
    add_topic_to_article,
    find_article_by_id,
    remove_article,
    get_article_topics,
    find_all_articles,
    find_all_articles_by_pages,
    find_all_articles_count,
    find_article_commentaries,
    insert_new_commentary,
    remove_commentary
}
