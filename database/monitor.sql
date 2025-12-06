CREATE DATABASE IF NOT EXISTS monitor;
USE monitor;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    senha_hash VARCHAR(255),
    tipo_usuario VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Dispositivo (
    id_dispositivo INT AUTO_INCREMENT PRIMARY KEY,
    nome_dispositivo VARCHAR(100),
    ip VARCHAR(50),
    porta INT,
    localizacao VARCHAR(100),
    status_atual VARCHAR(50),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Container (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    acao VARCHAR(255),
    descricao TEXT,
    data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE TesteRede (
    id_teste INT AUTO_INCREMENT PRIMARY KEY,
    tipo_teste VARCHAR(50),
    resultado VARCHAR(50),
    latencia VARCHAR(50),
    porta_aberta BOOLEAN,
    data_execucao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_dispositivo INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_dispositivo) REFERENCES Dispositivo(id_dispositivo) ON DELETE CASCADE ON UPDATE CASCADE
);
