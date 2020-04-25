let find_topic_by_id = 'SELECT id, name FROM topics WHERE id = $1';
let find_topic_by_name = 'SELECT id, name FROM topics WHERE name = $1';
let get_all_topics = 'SELECT id, name FROM topics';
let remove_topic = 'DELETE FROM topics WHERE id = $1';
let update_topic = 'UPDATE topics SET name = $1 WHERE id = $2';
let create_topic = 'INSERT into topics (name) VALUES ($1)';

module.exports = {
    find_topic_by_name,
    get_all_topics,
    find_topic_by_id,
    remove_topic,
    update_topic,
    create_topic,
}
