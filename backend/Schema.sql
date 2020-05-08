DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users_roles CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS users_languages CASCADE;
DROP TABLE IF EXISTS lesson_states CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS lessons_topics CASCADE;
DROP TABLE IF EXISTS lessons_users CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS articles_topics CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS test CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS users_tests CASCADE;

CREATE TABLE users
(
    id         BIGSERIAL NOT NULL,
    login      TEXT      NOT NULL UNIQUE,
    email      TEXT      NOT NULL UNIQUE,
    password   TEXT      NOT NULL,
    first_name TEXT      NULL,
    last_name  TEXT      NULL,
    active     BOOLEAN   NOT NULL DEFAULT TRUE,
    about      TEXT      NULL,
    rate       REAL      NULL
        CONSTRAINT rate_range CHECK (rate >= 0 AND rate <= 5),
    num_rates  INTEGER   NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE roles
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE users_roles
(
    id_user BIGINT  NOT NULL,
    id_role INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_role) REFERENCES roles (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_user, id_role)
);

CREATE TABLE languages
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE users_languages
(
    id_user     BIGINT  NOT NULL,
    id_language INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_language) REFERENCES languages (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_user, id_language)
);

CREATE TABLE lesson_states
(
    id   SERIAL NOT NULL,
    name TEXT   NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE lessons
(
    id               BIGSERIAL NOT NULL,
    id_teacher       BIGINT    NOT NULL,
    id_language      INTEGER   NOT NULL,
    id_topic         BIGINT    NOT NULL,
    id_state         INTEGER   NOT NULL DEFAULT 2,
    title            TEXT      NOT NULL,
    start_time       TIMESTAMP NOT NULL,
    duration_minutes SMALLINT  NOT NULL,
    min_attendees    INTEGER   NOT NULL DEFAULT 1,
    max_attendees    INTEGER   NOT NULL,
    description      TEXT      NULL,
    FOREIGN KEY (id_teacher) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_language) REFERENCES languages (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_state) REFERENCES lesson_states (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE topics
(
    id   BIGSERIAL NOT NULL,
    name TEXT      NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE lessons_users
(
    id_lesson        BIGINT    NOT NULL,
    id_user          BIGINT    NOT NULL,
    speaker_rate     SMALLINT  NULL,
    speaker_feedback TEXT      NULL,
    time_posted      TIMESTAMP NULL,
    FOREIGN KEY (id_lesson) REFERENCES lessons (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_lesson, id_user)
);

CREATE TABLE subscriptions
(
    id_teacher BIGINT NOT NULL,
    id_user    BIGINT NOT NULL,
    FOREIGN KEY (id_teacher) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_teacher, id_user)
);

CREATE TABLE articles
(
    id          BIGSERIAL NOT NULL,
    id_author   BIGINT    NOT NULL,
    id_title    TEXT      NOT NULL,
    contents    TEXT      NOT NULL,
    time_posted TIMESTAMP NOT NULL,
    FOREIGN KEY (id_author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE articles_topics
(
    id_article BIGINT NOT NULL,
    id_topic   BIGINT NOT NULL,
    FOREIGN KEY (id_article) REFERENCES articles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_topic) REFERENCES topics (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (id_article, id_topic)
);

CREATE TABLE comments
(
    id          BIGSERIAL NOT NULL,
    id_author   BIGINT    NOT NULL,
    id_lesson   BIGINT    NOT NULL,
    contents    TEXT      NOT NULL,
    time_posted TIMESTAMP NOT NULL,
    FOREIGN KEY (id_author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_lesson) REFERENCES lessons (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE test
(
    id               BIGSERIAL NOT NULL,
    id_author        BIGINT    NOT NULL,
    test_name        TEXT      NOT NULL,
    time_posted      TIMESTAMP NOT NULL,
    questions_number INT       NOT NULL,
    FOREIGN KEY (id_author) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE question
(
    id             BIGSERIAL NOT NULL,
    id_test        BIGINT    NOT NULL,
    question       TEXT      NOT NULL,
    first          TEXT      NOT NULL,
    second         TEXT      NOT NULL,
    third          TEXT      NOT NULL,
    right_question TEXT      NOT NULL,
    FOREIGN KEY (id_test) REFERENCES test (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE users_tests
(
    id_test     BIGINT NOT NULL,
    id_user     BIGINT NOT NULL,
    user_points INT    NOT NULL,
    time_spend  BIGINT NOT NULL,
    FOREIGN KEY (id_test) REFERENCES test (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_test, id_user)
);
