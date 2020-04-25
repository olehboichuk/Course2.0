let find_all_languages = 'SELECT id, name FROM languages';
let find_all_languages_sorted = 'SELECT id, name FROM languages order by name asc';
let find_language_by_id = 'SELECT id, name FROM languages WHERE id = ?';
let find_language_by_name = 'SELECT id, name FROM languages WHERE name = ?';
let insert_language = 'INSERT INTO languages (name) VALUES(?)';
let update_language = 'UPDATE languages SET name = ? WHERE id = ?';
let delete_language = 'DELETE FROM languages WHERE id = ?';
let get_teacher_languages = 'SELECT l.id, l.name FROM users u INNER JOIN users_languages ul ON u.id = ul.id_user INNER JOIN languages l ON  ul.id_language = l.id WHERE u.id =?';

module.exports = {
    find_all_languages,
    find_all_languages_sorted,
    find_language_by_id,
    find_language_by_name,
    insert_language,
    update_language,
    delete_language,
    get_teacher_languages,
}
