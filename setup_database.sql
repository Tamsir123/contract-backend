-- Create database
CREATE DATABASE IF NOT EXISTS claircontrat_db;
USE claircontrat_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    birth_date DATE,
    gender ENUM('homme', 'femme', 'autre'),
    user_type ENUM('particulier', 'professionnel', 'entreprise') DEFAULT 'particulier',
    accept_terms BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create preferences table
CREATE TABLE IF NOT EXISTS preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_preferences table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    preference_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (preference_id) REFERENCES preferences(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_preference (user_id, preference_id)
);

-- Insert some default preferences
INSERT IGNORE INTO preferences (label, description) VALUES
('Clauses financières', 'Alertes sur les obligations financières et pénalités'),
('Données personnelles', 'Protection et utilisation des données personnelles'),
('Résiliation', 'Conditions et modalités de résiliation'),
('Responsabilité', 'Clauses de limitation de responsabilité'),
('Durée engagement', 'Durée minimale d\'engagement et renouvellement'),
('Pénalités', 'Frais cachés et pénalités diverses'),
('Service client', 'Qualité du service et support client'),
('Modification contrat', 'Possibilité de modification unilatérale du contrat');

-- Show created tables
SHOW TABLES;
