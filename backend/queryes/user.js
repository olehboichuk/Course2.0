let createUser = 'select * from insert_full_user(_login := $1, _email := $2, _password := $3, _first_name := $4, _last_name := $5, _about := $6, _roles := $7, _language_ids := $8)';
let find_all_users = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users where active=TRUE';
let find_users = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users order by id asc';
let find_users_count = 'SELECT COUNT (*) FROM users';
let find_user_with_email = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users where email=$1';
let find_user_with_id = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users where id=$1';
let find_user_with_login = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users where login=$1';
let add_role_to_user = 'INSERT INTO users_roles (id_user, id_role) VALUES ($1, $2)';
let find_user_roles = 'select name from roles inner join users_roles on users_roles.id_role=roles.id inner join  users on users.id=id_user where users.id=$1';
let find_role_id = 'select id from roles where name =$1';
let find_all_teachers = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users where \'TEACHER\' in (select name  from  roles inner join users_roles on users_roles.id_role=roles.id where users.id=id_user) AND active=TRUE';
let find_languages_by_user_id = 'select languages.id, languages.name from  users inner join users_languages on users.id=users_languages.id_user inner join  languages on languages.id=id_language where users.id=$1';
let subscribe_to_teacher = 'insert into subscriptions (id_teacher, id_user) values ($1, $2)';
let unsubscribe_from_teacher = 'delete from subscriptions where id_teacher=$1 AND id_user=$2';
let find_subscriptions_by_user_id = 'select teachers.id, teachers.login,  teachers.email,teachers.password,  teachers.first_name,  teachers.last_name, teachers.active,  teachers.about,  teachers.rate, teachers.num_rates from  users as teachers inner join subscriptions on teachers.id=subscriptions.id_teacher inner join  users on users.id=id_user where users.id = $1 AND teachers.active=TRUE';
let find_subscribers_of_teacher_by_his_id = 'select id, login, email, password, first_name, last_name, active, about, rate, num_rates from users inner join subscriptions on users.id=subscriptions.id_user where active=TRUE and subscriptions.id_teacher=$1';
let simple_subscribers_of_teacher_by_his_id = 'select id, login, first_name, last_name, rate, num_rates from users inner join subscriptions on users.id=subscriptions.id_user where active=TRUE and subscriptions.id_teacher=$1';
let change_password = 'update users set password = $1 where id = $2';
let change_student = 'update users set first_name = $1, last_name = $2, email = $3, about = $4 where id = $5';
let insert_user_language = 'insert into users_languages (id_user, id_language) values ($1, $2)';
let find_all_languages = 'SELECT id, name FROM languages';
let remove_user_languages = 'delete from users_languages where id_user = $1';
let deactivate_by_user_id = 'update users set active=FALSE where users.id=$1';


module.exports = {
    change_student,
    deactivate_by_user_id,
    remove_user_languages,
    find_all_languages,
    find_all_users,
    find_users,
    find_users_count,
    find_user_with_email,
    find_user_with_id,
    find_user_with_login,
    add_role_to_user,
    find_user_roles,
    find_role_id,
    find_all_teachers,
    find_subscriptions_by_user_id,
    find_languages_by_user_id,
    subscribe_to_teacher,
    unsubscribe_from_teacher,
    find_subscribers_of_teacher_by_his_id,
    simple_subscribers_of_teacher_by_his_id,
    change_password,
    insert_user_language,
    createUser,
}
