let insert_new_lesson = 'insert into lessons ' +
  '  (id_teacher, id_language, id_topic, title, start_time, duration_minutes, ' +
  '  min_attendees, max_attendees, description) ' +
  '  values($1, $2, $3, $4, $5, $6, $7, $8, $9)';
let update_lesson = 'update lessons set id_teacher = $1, id_language = $2, id_topic = $3,' +
  '  title = $4, start_time = $5,' +
  '  duration_minutes = $6, min_attendees = $7,' +
  '  max_attendees = $8, description = $9' +
  '  where id = $10';
let get_all_lessons = 'SELECT m.id, m.id_teacher, m.id_language, m.id_topic, m.id_state, m.title, m.start_time,' +
  '  m.duration_minutes, m.min_attendees, m.max_attendees, m.description,' +
  '  u.login AS teacher_login, u.first_name AS teacher_first_name, u.last_name AS teacher_last_name,' +
  '  u.rate AS teacher_rate, u.num_rates AS teacher_num_rates,' +
  '  l.name AS language_name, t.name AS topic_name, (SELECT COUNT (*) FROM users INNER JOIN lessons_users lu ON users.id = lu.id_user WHERE lu.id_lesson = m.id AND users.active = TRUE) AS users_join ' +
  '  FROM lessons m INNER JOIN users u on m.id_teacher = u.id' +
  '  INNER JOIN languages l on m.id_language = l.id' +
  '  INNER JOIN topics t on m.id_topic = t.id' +
  '  WHERE u.active = TRUE AND' +
  '  m.id_state IN (select id from lesson_states where name = \'SCHEDULED\' or name = \'BOOKED\')' +
  '  ORDER BY m.start_time ASC';
let get_teacher_lessons = 'select lessons.id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description from lessons where id_teacher=$1';
let add_topic_to_lesson = 'update lessons set id_topic = $1 where id = $2';
let find_topic_id = 'select id from topics where name = $1';
let future_joined_lessons_of_user = 'select lessons.id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description' +
  '  from lessons inner join lessons_users on lessons.id=lessons_users.id_lesson' +
  '  inner join users on users.id=lessons_users.id_user' +
  '  where users.id=$1 AND id_teacher IN (select users.id from users where users.active=TRUE)' +
  '  AND lessons.id_state IN (select id from lesson_states where name=\'SCHEDULED\' or name=\'BOOKED\')' +
  '  order by lessons.start_time asc';
let find_if_user_joined_lesson = 'SELECT lu.id_user FROM lessons_users lu WHERE lu.id_user = $1 AND lu.id_lesson = $2';
let past_joined_lessons_of_user = 'select lessons.id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description' +
  '  from lessons inner join lessons_users on lessons.id=lessons_users.id_lesson' +
  '  inner join users on users.id=lessons_users.id_user' +
  '  where users.id=$1 AND id_teacher IN (select users.id from users where users.active=TRUE)' +
  '  AND lessons.id_state IN (select id from lesson_states where name=\'PASSED\' or name=\'IN PROGRESS\' or name=\'TERMINATED\')' +
  '  order by lessons.start_time desc';
let future_hosted_lessons_of_user = 'select lessons.id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description' +
  '  from lessons' +
  '  where id_teacher=$1 AND lessons.id_state IN (select id from lesson_states where name=\'SCHEDULED\' or name=\'BOOKED\')' +
  '  order by lessons.start_time asc';
let past_hosted_lessons_of_user = 'select lessons.id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description' +
  '  from lessons' +
  '  where id_teacher=$1 AND lessons.id_state IN (select id from lesson_states where name=\'PASSED\' or name=\'IN PROGRESS\' or name=\'TERMINATED\')' +
  '  order by lessons.start_time desc';
let add_user_to_lesson = 'insert into lessons_users (id_lesson, id_user) values ($1, $2)';
let remove_user_from_lesson = 'delete from lessons_users where id_lesson = $1 and id_user = $2';
let remove_all_users_from_lesson = 'delete from lessons_users where id_lesson = $1';
let get_users_on_lesson = 'select  u.id, u.login, u.email, u.password, u.first_name, u.last_name, u.active, u.about, u.rate, u.num_rates' +
  '                    from users u inner join lessons_users mu on u.id = mu.id_user' +
  '                    where mu.id_lesson = $1 AND u.active = TRUE';
let get_joined_count = 'SELECT COUNT (*)' +
  '                   FROM users u INNER JOIN lessons_users mu ON u.id = mu.id_user' +
  '                   WHERE mu.id_lesson = $1 AND u.active = TRUE';
let find_lesson_by_id = 'select id, id_teacher, id_language, id_topic, id_state, title, start_time, duration_minutes, min_attendees, max_attendees, description from lessons where id = $1';
let get_display_lesson_by_id = 'SELECT m.id, m.id_teacher, m.id_language, m.id_topic, m.id_state, m.title, m.start_time,' +
  '  m.duration_minutes, m.min_attendees, m.max_attendees, m.description,' +
  '  u.login AS teacher_login, u.first_name AS teacher_first_name, u.last_name AS teacher_last_name,' +
  '  u.rate AS teacher_rate, u.num_rates AS teacher_num_rates,' +
  '  l.name AS language_name, t.name AS topic_name, (SELECT COUNT (*) FROM users INNER JOIN lessons_users lu ON users.id = lu.id_user WHERE lu.id_lesson = m.id AND users.active = TRUE) AS users_join,' +
  '  (SELECT lu.id_user FROM lessons_users lu WHERE lu.id_user = $1 AND lu.id_lesson = m.id) AS if_user_joined' +
  '  FROM lessons m INNER JOIN users u on m.id_teacher = u.id' +
  '  INNER JOIN languages l on m.id_language = l.id' +
  '  INNER JOIN topics t on m.id_topic = t.id' +
  '  WHERE m.id = $2';
let rate_lesson = 'update lessons_users set teacher_rate = $1, teacher_feedback = $2, time_posted = $3 where id_lesson = $4 and id_user = $5';
let get_teacher_rate_from_lesson = 'SELECT teacher_rate' +
  '                               FROM lessons_users' +
  '                               WHERE id_lesson = $1 and id_user = $2';
let set_cancelled_to_lessons = 'update lessons set id_state = 4 where (id_state = 2 OR id_state = 3) AND (start_time < $1)';
let set_terminated_to_lessons = 'update lessons set id_state = 6 where (id_state = 2 OR id_state = 3) AND id = $1';
let find_lesson_commentaries = 'SELECT c.id, c.id_author, c.id_lesson, c.contents, c.time_posted, ' +
  'u.login AS author_login ' +
  'FROM comments c INNER JOIN users u on c.id_author = u.id ' +
  'WHERE c.id_lesson = $1 ' +
  'ORDER BY c.time_posted DESC';
let insert_new_commentary = 'INSERT INTO comments (id_author, id_lesson, contents, time_posted) VALUES ($1, $2, $3, $4)';
let remove_commentary = 'DELETE FROM comments WHERE id = $1';

module.exports = {
  insert_new_lesson,
  update_lesson,
  get_all_lessons,
  get_teacher_lessons,
  add_topic_to_lesson,
  find_topic_id,
  future_joined_lessons_of_user,
  find_if_user_joined_lesson,
  past_joined_lessons_of_user,
  future_hosted_lessons_of_user,
  past_hosted_lessons_of_user,
  add_user_to_lesson,
  remove_user_from_lesson,
  remove_all_users_from_lesson,
  get_users_on_lesson,
  get_joined_count,
  find_lesson_by_id,
  get_display_lesson_by_id,
  rate_lesson,
  get_teacher_rate_from_lesson,
  set_cancelled_to_lessons,
  set_terminated_to_lessons,
  find_lesson_commentaries,
  insert_new_commentary,
  remove_commentary
}
