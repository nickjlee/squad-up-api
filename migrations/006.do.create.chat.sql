CREATE TABLE chat(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    message_body VARCHAR(500) NOT NULL,
    time_stamp TIMESTAMP DEFAULT now() NOT NULL,
    pinned VARCHAR(500),
    squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE NOT NULL
);

