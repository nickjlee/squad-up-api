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
( 'apex', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'overwatch', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'destiny2', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'rain bow six', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'world of warcraft', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'super smash bros', 'Video Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'tennis', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'monopoly', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'life', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'catan', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'clue', 'Board Games','https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'uno', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'poker', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'texas holdem', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'cards against humanity', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'exploding kittens', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'basketball', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'hiking', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'badminton', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'baseball', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'football', 'Recreation', 'https://image.flaticon.com/icons/svg/78/78373.svg' ),
( 'the awkward storyteller', 'Card Games', 'https://image.flaticon.com/icons/svg/78/78373.svg' );

INSERT INTO squads (squad_name, squad_location, game_id, leader) VALUES 
( 'squad1', 'somewhere on earth', '1', '1' ),
( 'squad2', 'somewhere on earth', '1', '1' ),
( 'random long squad name for testing', 'somewhere on earth', '1', '1'),
( 'squad4', 'somewhere on earth', '1', '1'),
( 'squad5', 'somewhere on earth', '1', '1'),
( 'squad6', 'somewhere on earth', '1', '1'),
( 'squad7', 'somewhere on earth', '1', '1'),
( 'squad8', 'somewhere on earth', '1', '1'),
( 'squad9', 'somewhere on earth', '1', '1'),
( 'squad10', 'Los Angeles, CA', '1', '1');

INSERT INTO user_squads (user_id, squad_id) VALUES (
    ('1', '1'),
    ('1', '2'),
    ('1', '3'),
    ('1', '4'),
    ('1', '5'),
    ('1', '6'),
    ('1', '7'),
    ('1', '8'),
    ('1', '9'),
    ('1', '10')
);

COMMIT;