CREATE TYPE game_category AS ENUM (
    'Video Games', 
    'Board Games', 
    'Card Games', 
    'Table Top Games', 
    'Recreation'
);

CREATE TABLE games(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    -- modifieddate TIMESTAMP DEFAULT now() NOT NULL,
    game_title TEXT NOT NULL,
    image TEXT NOT NULL
);

ALTER TABLE games
    ADD COLUMN
        game_type game_category;
        
ALTER TABLE squads
    ADD COLUMN
        game_id INTEGER REFERENCES games(id) NOT NULL;