INSERT  into  roles (name) values ('ADMIN'),('TEACHER'),('STUDENT');

INSERT into languages (name) values ('English'), ('French'), ('German'), ('Ukrainian'),
                                    ('Chinese'), ('Japanese');

INSERT into lesson_states (id, name) values (2, 'SCHEDULED'), (3, 'BOOKED'), (4, 'CANCELED'),
                                        (5, 'IN PROGRESS'), (6, 'TERMINATED'), (7, 'PASSED');

INSERT into topics (name) values ('Other'), ('Business'), ('Technology'), ('Health'), ('Sports'), ('Politics'),
                                 ('Art');

INSERT into notification_types (name) values
('LESSON_BOOKED'), ('HOSTED_LESSON_STARTS_SOON'), ('JOINED_LESSON_STARTS_SOON'), ('LESSON_INFO_CHANGED'),
('NEW_SUBSCRIBED_LESSON'), ('LEAVE_FEEDBACK'), ('PROFILE_DEACTIVATED'), ('PROFILE_ACTIVATED');
