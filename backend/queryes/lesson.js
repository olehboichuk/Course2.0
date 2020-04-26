let insert_new_lesson = 'insert into lessons ' +
  '  (id_teacher, id_language, id_topic, title, start_time, duration_minutes, ' +
  '  min_attendees, max_attendees, description) ' +
  '  values($1, $2, $3, $4, $5, $6, $7, $8, $9);';

module.exports = {
  insert_new_lesson,
}
