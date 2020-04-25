CREATE OR REPLACE FUNCTION insert_full_user(_login TEXT, _email TEXT, _password TEXT,
                           _first_name TEXT, _last_name TEXT, _about TEXT,
                           _roles TEXT[], _language_ids INTEGER[])
    RETURNS VOID AS
$$
DECLARE
    _id_user BIGINT;
    _role TEXT;
    _id_role INTEGER;
    _id_lang INTEGER;
BEGIN
    INSERT INTO users (login, email, password, first_name, last_name, about)
    VALUES (_login, _email, _password, _first_name, _last_name, _about) RETURNING id INTO _id_user;

    FOREACH _role IN ARRAY _roles
        LOOP
            SELECT id FROM roles WHERE name = _role INTO _id_role;
            INSERT INTO users_roles (id_user, id_role)
            VALUES (_id_user, _id_role);
        END LOOP;

    FOREACH _id_lang IN ARRAY _language_ids
        LOOP
            INSERT INTO users_languages (id_user, id_language)
            VALUES (_id_user, _id_lang);
        END LOOP;
END;
$$ LANGUAGE plpgsql;
