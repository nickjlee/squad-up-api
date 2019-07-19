BEGIN;

TRUNCATE
    users,
    games,
    user_squads,
    squads
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, name, avatar) VALUES (
    'demo',
    --password: pass1
    '$2a$12$zjujb7acz65IE0DOM1JJ6.iedBs1Opou6.9ADYHW.DwbfxQsw.niG',
    'Demo User',
    'https://res.cloudinary.com/squad-up/image/upload/v1563210869/avatars/avatar1_n22av6.png'
);

INSERT INTO games (game_title, game_type, image) VALUES 
-- Video Games
( 'Apex Legends', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217196/apex_fqxwyf.png' ),
( 'Overwatch', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217204/overwatch_rrif0t.png' ),
( 'Destiny 2', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217202/destiny2_y6vuvm.png' ),
( 'Rainbow Six: Siege', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217197/rainbowsixsiege_lxwcje.jpg' ),
( 'World of Warcraft', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563225372/worldofwarcraft_ppiukk.png' ),
( 'Super Smash Bros Ultimate', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563225462/supersmashbrosultimate_rmveks.png' ),
( 'Fortnite', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217201/fortnite_muuila.jpg' ),
( 'The Division 2', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217201/division2_difwmw.jpg' ),
( 'Mordhau', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217203/mordhau_xmfizx.jpg' ),
( 'CoD: Black Ops 4', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217197/blackops4_x7qmqx.jpg' ),
( 'Sea of Thieves', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217198/seaofthieves_pxayfw.jpg' ),
( 'GTA V', 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217203/gtav_nqxmit.jpg' ),
( 'Player Unknown''s Battleground' , 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217197/pubg_bnvh7y.jpg' ),
( 'Rocket League' , 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217197/rocketleague_jukgfo.jpg' ),
( 'Red Dead Online' , 'Video Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217197/reddead2_vdacut.jpg' ),
-- Board Games
( 'Monopoly', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563226341/monopoly_ilp7ck.jpg' ),
( 'The Game of Life', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217203/life_m7lkeb.jpg' ),
( 'Chess', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217198/chess_s2imnu.jpg' ),
( 'Checkers', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217198/checkers_bt8q79.jpg' ),
( 'Scrabble', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217198/scrabble_idv00c.jpg' ),
( 'Clue', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217199/clue_cohthu.jpg' ),
( 'Apples to Apples', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217196/applestoapples_rop9m4.jpg' ),
( 'Settlers of Catan', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217199/catan_kxtybb.jpg' ),
( 'Sorry', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/sorry_uwg7ee.jpg' ),
( 'Yahtzee', 'Board Games','https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/yahtzee_mov99q.jpg' ),
-- Card Games
( 'Uno', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239975/uno_rahvvi.jpg' ),
( 'Cards Against Humanity', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563242550/cardsagainsthumanity_vvd2ng.png' ),
( 'Exploding Kittens', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563242553/explodingkittens_sjvmo4.png' ),
( 'The Awkward Storyteller', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563242760/awkwardstoryteller_culepg.jpg' ),
( 'Poker', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/poker_jclqsb.jpg' ),
( 'Texas Hold''em', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/texas_woq11x.jpg' ),
( 'Black Jack', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/blackjack_pmr7lo.jpg' ),
( 'Bridge', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/bridge_chtmla.jpg' ),
( 'Go Fish', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/genericplayingcards_zfrbzl.png' ),
( 'Slap Jack', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/genericplayingcards_zfrbzl.png' ),
( 'Crazy 8''s', 'Card Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/crazy8s_vkotbg.jpg' ),
-- Table Top Games
( 'Dungeons & Dragons', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/d_d_fgnccy.jpg' ),
( 'Shadowrun', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217199/shadowrun_zxijjm.jpg' ),
( 'Call of Cthulhu', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/cthulhu_uzot0v.jpg' ),
( 'Vampier: The Masquerade', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/vampirethemasquerade_rnbayf.jpg' ),
( 'Star Wars The RPG', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/starwars_ezhuqe.jpg' ),
( 'Pathfinder', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217196/pathfinder_lenr4s.jpg' ),
( 'GURPS', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217203/gurps_wqfnnc.jpg' ),
( 'Werewolf: The Apocalypse', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217201/werewolftheapocalypse_vsodal.jpg' ),
( 'Mage: The Ascension', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217203/mage_i6kqqs.jpg' ),
( 'Savage Worlds', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217198/savageworlds_bbr1lc.jpg' ),
( 'Paranoia', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239453/paranoia_mrjmrt.jpg' ),
( 'Cyberpunk 2020', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563239452/cyberpunk_tzfbid.jpg' ),
( 'Deadlands', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217201/deadlands_mpohgz.jpg' ),
( 'World of Darkness', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217201/worldofdarkness_sav1ip.jpg' ),
( 'Traveller', 'Table Top Games', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563217200/traveller_vaqoob.jpg' ),
-- Recreation
( 'Basketball', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345660/basketball2_pmarwx.png' ),
( 'Football', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345554/football_euthwa.svg' ),
( 'Baseball', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345553/baseball_huf75q.svg' ),
( 'Soccer', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345555/soccer_nye41t.svg' ),
( 'Softball', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345553/baseball_huf75q.svg' ),
( 'Tennis', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345555/tennis_nvt1sy.svg' ),
( 'Rugby', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/v1563345553/rugby2_m1akmh.svg' ),
( 'Cycling', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345553/cycling_cvdimv.svg' ),
( 'Hockey', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345554/hockey2_ai3ygz.png' ),
( 'Table Tennis', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345555/tabletennis_xgxhly.svg' ),
( 'Bowling', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345554/bowling2_fcge6a.png' ),
( 'Badminton', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563345554/badminton2_hibq91.png' ),
( 'Marathon Training', 'Recreation', 'https://res.cloudinary.com/squad-up/image/upload/c_scale,w_200/v1563346338/running2_s6k3pg.png' );

INSERT INTO squads (squad_name, squad_location, game_id, leader, capacity) VALUES 
( 'squad1', 'somewhere on earth', '1', '1', '4' ),
( 'squad2', 'somewhere on earth', '1', '1', '4' ),
( 'random long squad name for testing', 'somewhere on earth', '1', '1', '4' ),
( 'squad4', 'somewhere on earth', '1', '1', '4' ),
( 'squad5', 'somewhere on earth', '1', '1', '4' ),
( 'squad6', 'somewhere on earth', '1', '1', '4' ),
( 'squad7', 'somewhere on earth', '1', '1', '4' ),
( 'squad8', 'somewhere on earth', '1', '1', '4' ),
( 'squad9', 'somewhere on earth', '1', '1', '4' ),
( 'squad10', 'Los Angeles, CA', '1', '1', '5' );

INSERT INTO user_squads (user_id, squad_id) VALUES 
( '1', '1' ),
( '1', '2' ),
( '1', '3' ),
( '1', '4' ),
( '1', '5' ),
( '1', '6' ),
( '1', '7' ),
( '1', '8' ),
( '1', '9' ),
( '1', '10' );

INSERT INTO squads (id, squad_name, squad_location, leader, capacity) VALUES
(999, 'General Chat', 'nowhere', 1, 1000);

COMMIT;