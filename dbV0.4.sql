CREATE DATABASE projectdb;
USE projectdb;

CREATE TABLE account(
    email VARCHAR(50) PRIMARY KEY,
    pwd VARCHAR(256),
    role INT(1)
);

CREATE TABLE teacher(
    id_teach INT AUTO_INCREMENT PRIMARY KEY,
    nom_t VARCHAR(20),
    prenom_t VARCHAR(20),
    dep VARCHAR(30)
);

CREATE TABLE session(
    id_session INT AUTO_INCREMENT PRIMARY KEY,
    qr VARCHAR(256),
    date DATE,
    salle VARCHAR(10),
    nom_t VARCHAR(20),
    module VARCHAR(50)
);