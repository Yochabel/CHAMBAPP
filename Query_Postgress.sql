-- Activar PostGIS solo si no existe
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabla: Horarios
CREATE TABLE IF NOT EXISTS Horarios (
    Horarios_ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NOT NULL
);

-- Tabla: Country
CREATE TABLE IF NOT EXISTS Country (
    Country_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name_country VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla: States
CREATE TABLE IF NOT EXISTS States (
    States_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    state_name VARCHAR(50) NOT NULL
);

-- Tabla: City
CREATE TABLE IF NOT EXISTS City (
    City_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL
);

-- Tabla: PostalCode
CREATE TABLE IF NOT EXISTS PostalCode (
    PostalCode_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    postal_code VARCHAR(10) NOT NULL
);

-- Tabla: Locations
CREATE TABLE IF NOT EXISTS Locations (
    Locations_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city_id BIGINT NOT NULL REFERENCES City(City_ID),
    states_id BIGINT NOT NULL REFERENCES States(States_ID),
    country_id BIGINT NOT NULL REFERENCES Country(Country_ID),
    postal_code_id BIGINT NOT NULL REFERENCES PostalCode(PostalCode_ID)
);

-- Tabla: PaymentMethods
CREATE TABLE IF NOT EXISTS PaymentMethods (
    PaymentMethods_ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payment_method VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla: ContactInfo
CREATE TABLE IF NOT EXISTS ContactInfo (
    ContactInfo_ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone VARCHAR(20),
    email VARCHAR(100),
    social_media VARCHAR(255)
);

-- Tabla: Chambeadores
CREATE TABLE IF NOT EXISTS Chambeadores (
    Chambeadores_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdentificationID VARCHAR(40) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    ProfileDetails VARCHAR(100),
    Email VARCHAR(40),
    Presentation TEXT,
    ServicesOffered TEXT,
    ProfileImageInS3 TEXT,
    Clarifications VARCHAR(100),
    DateAccountCreated TIMESTAMP,
    Payment_method_id INT REFERENCES PaymentMethods(PaymentMethods_ID),
    AmountOfJobs INT DEFAULT 0,
    TotalScore INT DEFAULT 0,
    AccumulatedCost INT DEFAULT 0,
    Location_id INT REFERENCES Locations(Locations_ID),
    location_postgis GEOGRAPHY(POINT) NOT NULL,
    ContactInfo INT REFERENCES ContactInfo(ContactInfo_ID),
    FK_Horario INT REFERENCES Horarios(Horarios_ID)
);

-- Tabla: Clients
CREATE TABLE IF NOT EXISTS Clients (
    Clients_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    IdentificationID VARCHAR(40) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    Email VARCHAR(40),
    ProfileImageInS3 TEXT,
    AmountOfJobs INT DEFAULT 0,
    TotalScore INT DEFAULT 0,
    ContactInfo INT REFERENCES ContactInfo(ContactInfo_ID),
    Location_id INT REFERENCES Locations(Locations_ID),
    location_postgis GEOGRAPHY(POINT) NOT NULL,
    FK_Horario INT REFERENCES Horarios(Horarios_ID)
);

-- Tabla: Chamba
CREATE TABLE IF NOT EXISTS Chamba (
    Chamba_ID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Client_ID INT REFERENCES Clients(Clients_ID),
    Chambeador_ID INT REFERENCES Chambeadores(Chambeadores_ID),
    IsChambaActive BOOLEAN DEFAULT TRUE,
    DateCreated TIMESTAMP,
    DateLimitForRequestClient TIMESTAMP,
    DateDiscussed TIMESTAMP,
    DateHappened TIMESTAMP,
    CostAgreed NUMERIC(10, 2),
    Servicio VARCHAR(100),
    Descripcion TEXT,
    StepStatus SMALLINT DEFAULT 0,
    ScoreForChambeador SMALLINT CHECK (ScoreForChambeador BETWEEN 1 AND 5),
    ScoreForClient SMALLINT CHECK (ScoreForClient BETWEEN 1 AND 5),
    ReviewTextFromChambeador TEXT,
    ReviewTextFromClient TEXT
);

-- Datos mínimos de prueba

-- País, estado, ciudad, código postal
INSERT INTO Country (name_country) VALUES ('México');
INSERT INTO States (state_name) VALUES ('Jalisco');
INSERT INTO City (city_name) VALUES ('Guadalajara');
INSERT INTO PostalCode (postal_code) VALUES ('44100');

-- Localización
INSERT INTO Locations (city_id, states_id, country_id, postal_code_id)
VALUES (1, 1, 1, 1);

-- Horario y métodos de pago
INSERT INTO Horarios (StartTime, EndTime) VALUES (NOW(), NOW());
INSERT INTO PaymentMethods (payment_method) VALUES ('Efectivo');

-- Contacto
INSERT INTO ContactInfo (phone, email, social_media) VALUES ('1234567890', 'user@test.com', '@test');

-- Chambeador
INSERT INTO Chambeadores (
    IdentificationID, FullName, Email, ProfileDetails, Location_id, location_postgis,
    Payment_method_id, ContactInfo, FK_Horario
) VALUES (
    'CH001', 'Juan Pérez', 'juan@test.com', 'Plomero con experiencia',
    1, ST_GeogFromText('POINT(-103.3496 20.6597)'), 1, 1, 1
);

-- Cliente
INSERT INTO Clients (
    IdentificationID, FullName, Email, Location_id, location_postgis,
    ContactInfo, FK_Horario
) VALUES (
    'CL001', 'Carlos Gómez', 'carlos@test.com',
    1, ST_GeogFromText('POINT(-103.3496 20.6597)'), 1, 1
);

-- Chamba de prueba (ID será 1)
INSERT INTO Chamba (
    Client_ID, Chambeador_ID, IsChambaActive, DateCreated, Servicio,
    Descripcion, StepStatus, ScoreForChambeador, ScoreForClient
) VALUES (
    1, 1, TRUE, NOW(), 'Reparación de fuga de agua',
    'Cliente reporta fuga en cocina', 1, 5, 5
);

-- Para el Chat
CREATE TABLE ChatMessages (
  id SERIAL PRIMARY KEY,
  room_id VARCHAR(100),            -- ID de la chamba o sala
  sender_id UUID,                  -- quien envió el mensaje
  receiver_id UUID,                -- opcional
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
