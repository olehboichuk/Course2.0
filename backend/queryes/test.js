let create_test = 'INSERT into test (id_author, test_name, time_posted, questions_number) VALUES ($1,$2,$3,$4) RETURNING id';
let get_all_tests = 'SELECT t.id, t.id_author, t.test_name, t.time_posted, t.questions_number, u.login AS teacher_login, u.first_name AS teacher_first_name, u.last_name AS teacher_last_name FROM test t INNER JOIN users u on t.id_author = u.id';
let find_test_by_id = 'SELECT t.id, t.id_author, t.test_name, t.time_posted, t.questions_number, u.login AS teacher_login, u.first_name AS teacher_first_name, u.last_name AS teacher_last_name FROM test t INNER JOIN users u on t.id_author = u.id WHERE t.id = $1';
let remove_test = 'DELETE FROM test WHERE id = $1';
let update_test = 'UPDATE topics SET name = $1 WHERE id = $2';//TODO
let create_user_pass_test = 'INSERT into topics (name) VALUES ($1)';
let create_question = 'INSERT into question (id_test, question, first_question, second_question, third_question, right_question) VALUES ($1,$2,$3,$4,$5,$6)';
let create_user_answer = 'INSERT into users_tests (id_test, id_user, user_points, time_spend) VALUES ($1,$2,$3,$4)';
let get_top_user_answer = 'SELECT ut.id_user, ut.user_points, ut.time_spend, u.login AS login, u.first_name AS first_name, u.last_name AS last_name FROM users_tests ut INNER JOIN users u on ut.id_user = u.id WHERE ut.id_test=$1 ORDER BY ut.user_points DESC, ut.time_spend ASC LIMIT 5';
let get_user_answer = 'SELECT user_points, time_spend FROM users_tests WHERE id_test=$1 AND id_user=$2';
let get_test_questions = 'SELECT * FROM question WHERE id_test = $1 ORDER BY random()';

module.exports = {
  get_user_answer,
  create_user_answer,
  get_top_user_answer,
  find_test_by_id,
  get_all_tests,
  remove_test,
  update_test,
  create_test,
  create_question,
  create_user_pass_test,
  get_test_questions,
}
