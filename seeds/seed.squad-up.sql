BEGIN;

TRUNCATE
    users RESTART IDENTITY CASCADE;
    games RESTART IDENTITY CASCADE;
    user_squads;
    squads RESTART IDENTITY CASCADE;

INSERT INTO users (id, username, password, name, avatar) VALUES (
    '1',
    'user1',
    'pass1',
    'test user1',
    'https://image.flaticon.com/icons/svg/78/78373.svg'
);
INSERT INTO games (id, game_title, game_type, image) VALUES 
( '1', 'monopoly', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( '2', 'apex', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( '3', 'tennis', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( '4', 'uno', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' );
INSERT INTO squads (id, squad_name, squad_location, game_id, leader, capacity) VALUES (
    '1',
    'squad1',
    'somewhere on earth',
    '1',
    '1',
    '4'
);
INSERT INTO user_squads (user_id, squad_id) VALUES (
    '1',
    '1'
);

COMMIT;