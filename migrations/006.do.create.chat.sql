CREATE TABLE chat(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    message_body VARCHAR(500) NOT NULL,
    time_stamp TIMESTAMPTZ DEFAULT now() NOT NULL,
    pinned VARCHAR(500),
    squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE NOT NULL DEFAULT 999
);