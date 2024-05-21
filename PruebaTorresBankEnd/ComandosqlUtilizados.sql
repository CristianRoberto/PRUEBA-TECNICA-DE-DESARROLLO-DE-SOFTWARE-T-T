CREATE DATABASE prueba;  ---Creacion de Base de Datos
use prueba ---Uso Base de datos Creada

CREATE TABLE departamentos (   ----Creacion de tabla departamento
    id INT PRIMARY KEY IDENTITY(1,1),
    codigo NVARCHAR(50),
    nombre NVARCHAR(100),
    activo BIT,
    idUsuarioCreacion INT,
    fechaCreacion DATETIME DEFAULT GETDATE()
);

CREATE TABLE cargos ( ----Creacion de tabla cargo
    id INT PRIMARY KEY IDENTITY(1,1),
    codigo NVARCHAR(50),
    nombre NVARCHAR(100),
    activo BIT,
    idUsuarioCreacion INT,
    fechaCreacion DATETIME DEFAULT GETDATE()
);

CREATE TABLE users ( ----Creacion de tabla Usuario
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario NVARCHAR(50) NOT NULL UNIQUE,
    primerNombre NVARCHAR(100),
    segundoNombre NVARCHAR(100),
    primerApellido NVARCHAR(100),
    segundoApellido NVARCHAR(100),
    idDepartamento INT,
    idCargo INT,
    fechaCreacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (idDepartamento) REFERENCES departamentos(id),
    FOREIGN KEY (idCargo) REFERENCES cargos(id)
);


INSERT INTO departamentos (codigo, nombre, activo, idUsuarioCreacion) 
VALUES 
    ('DEP001', 'Departamento de Ventas', 1, 1),
    ('DEP002', 'Departamento de Recursos Humanos', 1, 1);

	INSERT INTO cargos (codigo, nombre, activo, idUsuarioCreacion) 
VALUES 
    ('CRG001', 'Gerente de Ventas', 1, 1),
    ('CRG002', 'Analista de Recursos Humanos', 1, 1);


	INSERT INTO users (usuario, primerNombre, segundoNombre, primerApellido, segundoApellido, idDepartamento, idCargo) 
VALUES 
    ('usuario3', 'Juan', 'kylie', 'Perez', 'Gomez', 1, 1),
    ('usuario2', 'Maria', 'Isabel', 'Gonzalez', 'Lopez', 2, 2),
    ('usuario3', 'pedro', 'Isabel', 'perez', 'Lopez', 2, 2),
	    ('usuario4', 'Roberto', 'Isabel', 'aruz', 'aaaa', 2, 2);



	select * from users;

	delete from  users;

	drop table departamentos;
	drop table cargos;
	drop table users;