DROP TABLE IF EXISTS anyMovie;

CREATE TABLE anyMovie(

     id SERIAL PRIMARY KEY,
     title VARCHAR(255),
     release_date VARCHAR(255),
     poster_path VARCHAR(1000),
     overview VARCHAR(1000),
     comment VARCHAR(255)
);