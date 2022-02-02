DROP TABLE IF EXISTS movies

CREATE TABLE IF NOT EXISTS movies(
title VARCHAR(255),
genre_ids INTEGER,
original_language VARCHAR(255),
original_title VARCHAR(255),
poster_path VARCHAR(255),
video  BOOLEAN,
vote_average INTEGER,
overview VARCHAR(255),
release_date VARCHAR(255),
vote_count INTEGER,
id INTEGER,
adult BOOLEAN,
backdrop_path VARCHAR(255),
popularity INTEGER,
media_type VARCHAR(255),
);