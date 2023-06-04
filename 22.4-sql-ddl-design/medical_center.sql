DROP DATABASE IF EXISTS med_center;

CREATE DATABASE med_center;

\c med_center

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE doctor_patients (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors ON DELETE CASCADE
);

CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients ON DELETE CASCADE,
    complaint TEXT NOT NULL
);