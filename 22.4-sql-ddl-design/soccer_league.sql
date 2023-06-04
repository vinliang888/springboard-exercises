DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);


CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE season_rosters (
    id SERIAL PRIMARY KEY,
    season_id INTEGER NOT NULL REFERENCES seasons ON DELETE CASCADE,
    team_id INTEGER NOT NULL REFERENCES teams ON DELETE CASCADE,
    player_id INTEGER NOT NULL REFERENCES players ON DELETE CASCADE
);

CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    season_id INTEGER NOT NULL REFERENCES seasons ON DELETE CASCADE,
    ranking INTEGER NOT NULL,
    team_id INTEGER REFERENCES teams ON DELETE SET NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    season_id INTEGER NOT NULL REFERENCES seasons ON DELETE CASCADE,
    match_date TEXT NOT NULL,
    home_team_id INTEGER REFERENCES teams ON DELETE SET NULL,
    away_team_id INTEGER REFERENCES teams ON DELETE SET NULL
);

CREATE TABLE referees_matches (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches ON DELETE SET NULL,
    referee_id INTEGER REFERENCES referees ON DELETE SET NULL,
    referee_position TEXT NOT NULL
);

CREATE TABLE goals_scored (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches ON DELETE SET NULL,
    scoring_player_id INTEGER REFERENCES players ON DELETE SET NULL
);

