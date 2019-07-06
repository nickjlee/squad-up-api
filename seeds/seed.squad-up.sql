BEGIN;

TRUNCATE
    users,
    games,
    user_squads,
    squads
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, name, avatar) VALUES (
    'user1',
    --password: pass1
    '$2a$12$zjujb7acz65IE0DOM1JJ6.iedBs1Opou6.9ADYHW.DwbfxQsw.niG',
    'test user1',
    'https://image.flaticon.com/icons/svg/78/78373.svg'
);
INSERT INTO games (game_title, game_type, image) VALUES 
( 'monopoly', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'apex', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'apex', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'overwatch', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'destiny2', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'tennis', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'uno', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' );
INSERT INTO squads (squad_name, squad_location, game_id, leader, capacity) VALUES (
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