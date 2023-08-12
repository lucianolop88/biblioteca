drop database if exists biblioteca_34211309;
create database biblioteca_34211309;
use biblioteca_34211309;

create table Provincia(
CodProvincia int auto_increment,
Provincia varchar(25),
constraint pk_Provincia primary key (CodProvincia) 
);

create table Editorial(
CodEditorial int auto_increment,
Editorial varchar(50),
constraint pk_Editorial primary key (CodEditorial)
);

create table Socio(
CodSocio int auto_increment,
DNI varchar (10),
Nombre varchar (60),
Apellido varchar (60),
Direccion varchar (50),
CodProvincia int,
Tel varchar (15),
constraint pk_Socio primary key (CodSocio),
constraint fk_Socio_P foreign key(CodProvincia) references Provincia(CodProvincia)
);

create table Autor(
CodAutor int auto_increment,
Nombre varchar (60),
Apellido varchar (60),
constraint pk_Autor primary key (CodAutor)
);

create table Libro(
CodLibro int auto_increment,
Titulo varchar (90),
ISBN varchar (15),
CodEditorial int,
AEscritura date,
constraint pk_Libro primary key (CodLibro),
constraint fk_Libro_E foreign key(CodEditorial) references Editorial(CodEditorial)
);


create table LibroAutor(
CodLibro int,
CodAutor int,
constraint pk_LibroAutor primary key (CodLibro, CodAutor),
constraint fk_LibroAutor_L foreign key (CodLibro) references Libro (CodLibro),
constraint fk_LibroAutor_A foreign key (CodAutor) references Autor (CodAutor)
);

create table Ejemplar(
CodEjem int auto_increment,
CodLibro int,
Prestado boolean,
constraint pk_Ejemplar primary key (CodEjem),
constraint fk_Ejemplar_L foreign key (CodLibro) references Libro (CodLibro)
);



create table Prestamo(
CodPrestamo int auto_increment ,
CodSocio int,
CodEjem int,
FPrestamo date,
FDevolucion date default NuLL,
FTope date,
constraint pk_prestamo primary key (CodPrestamo),
constraint fk_Prestamo_S foreign key (CodSocio) references Socio(CodSocio),
constraint fk_Prestamo_E foreign key (CodEjem) references Ejemplar(CodEjem)
);

CREATE VIEW LibroCompleto AS SELECT CodLibro, Titulo, ISBN, CodAutor, Nombre, Apellido, AEscritura, CodEditorial, Editorial  from Libro natural join editorial natural join libroautor natural join autor order by codlibro;


INSERT INTO provincia VALUES
(1, 'Buenos Aires'),
(2, 'Buenos Aires-GBA'),
(3, 'Capital Federal'),
(4, 'Catamarca'),
(5, 'Chaco'),
(6, 'Chubut'),
(7, 'Córdoba'),
(8, 'Corrientes'),
(9, 'Entre Ríos'),
(10, 'Formosa'),
(11, 'Jujuy'),
(12, 'La Pampa'),
(13, 'La Rioja'),
(14, 'Mendoza'),
(15, 'Misiones'),
(16, 'Neuquén'),
(17, 'Río Negro'),
(18, 'Salta'),
(19, 'San Juan'),
(20, 'San Luis'),
(21, 'Santa Cruz'),
(22, 'Santa Fe'),
(23, 'Santiago del Estero'),
(24, 'Tierra del Fuego'),
(25, 'Tucumán');


insert into Editorial (Editorial) values
('RA-MA'),
('McGraw Hill'),
('Prentice Hall'),
('MP ediciones'),
('McGRAW-HILL'),
('Piramide Anaya'),
('Manantial'),
('Espacio'),
('Amorrortu editores'),
('Edibesa'),
('Alfaomega'),
('Laertes'),
('Anaya Multimedia'),
('Paperback');

insert into socio values
(1, '11452452','Maria Josefina', 'Luro', 'Av Nazca 21478', 1, '47857855'),
(2, '19785452', 'Marcos', 'Nevarez', 'Trelles 1234', 2, '47852154'),             
(3, '20145874', 'Juliana', 'Laprida', 'Bacacay 10789', 3, '49061236'),
(4, '22145986', 'Karina', 'Quirno', 'Bolivia 52345', 4, '47851414'),
(5, '20333564', 'Viviana', 'Martinez', 'Mendoza 123', 5, '45038796'),        
(6, '18754123', 'Federico', 'Fernandez', 'Melian 234', 6, '45012563'),          
(7, '32856922', 'Manuel', 'Fernandez',	'Av Corro 980', 3, '55097878'),
(8, '39412856', 'Nicolas', 'Quesada', 'Paz 408', 8, '46831512'),                
(9, '38012054', 'Armando', 'Alvarez', 'Pedernera 12', 10, '46874596'),           
(10, '36187002', 'Rogelio', 'Aragon', 'Av Beiro 3456', 20, '49876541'),           
(11, '40256321', 'Mariela', 'Gutierrez', 'Av Nazca 10789', 12, '45698736'),
(12, '23256321', 'Monica', 'Gutierrez', 'Las Lajas 2134', 13, '48998736'),
(13, '33256321', 'Oscar', 'Araoz', 'Baigorria 1122', 7, '42458736'),
(14, '40256111', 'Nicolas', 'Garcia Gomez', 'Peru 678', 1, '45690036'),
(15, '41056321', 'Florencia', 'Herrera', 'Av de los Incas 10789', 1, '45008736'),
(16, '47256321', 'Maria Gabriela', 'Fontana', 'Nutrias 10789', 3, '45698006'),
(17, '12256321', 'Joaquin Hernan', 'Gutierrez', 'Av Nazca 2458', 2, '45325736'),
(18, '16256321', 'Lucas Carlos', 'Martinez', 'Gomez de Acuña 10789', 2, '45668736'),
(19, '18356321', 'Mariela Lorena', 'Blanco', 'Frias 125', 9, '45632736');


insert into autor values
 (1, 'Jose Maria', 'Martin'),
 (2, 'Martin', 'Pozuelo'),
 (3, 'Enrique', 'Palladino'),
 (4, 'Leandro', 'Palladino'),
 (5, 'Judith', 'Shulman'),
 (6, 'Rachel', 'Lotan'),
 (7, 'Jennifer', 'Whitcomb'),
 (8, 'Fernando', 'Casale'),
 (9, 'Gustavo', 'Katcheroff'),
 (10,'Harold','Davis'),
 (11, 'Thomas', 'Armstrong'),
 (12,'Hector','Arena'),
 (13,'Carlos','Fernandez Garcia'),
 (14,'Jose Javier','García Badell'),
 (15,'Craig','Zacker'),
 (16, 'Merilee', 'Ford'),
 (17, 'Marco', 'Cantu'),
 (18, 'Mariona', 'Grane'),
 (19, 'Cilia', 'Willem'),
 (20, 'Francisco Jose', 'Molina Robles'),
 (21, 'German', 'Pacio'),
 (22,'Jose Higinio','Cernuda Menendez'),
 (23, 'Deborah', 'Johnson'),
 (24, 'Luis Joyanes', 'Aguilar'),
 (25,'Stuart','McClure'),
 (26,'Joel','Scambray'),
 (27,'George','Kurtz'),
 (28, 'Laura', 'Raya Gonzalez'),
 (29, 'David', 'Miraut Andres'), 
 (30, 'José Luis', 'Raya Cabrera'),
 (31, 'Laura Raya', 'Gonzalez'),
 (32, 'Miguel Santesmases', 'Mestre'),
 (33, 'Juan Ignacio', 'deTena'),
 (34,'Mark','Dodge'),
 (35,'Craig','Stinson'),
 (36,'Mario G.','Piattini Velthuis'),
 (37,'José A.','Calvo Manzano Villalón'),
 (38,'Joaquín','Cervera Bravo'),
 (39,'Luis','Fernández Sanz'),
 (40,'Ricardo','Goldberger'),
 (41, 'José', 'Coviella');
 



insert into Libro values
 (1,'Los secretos de Visual Basic 5','9788441502315',13,'1997/05/22'),
 (2,'Las inteligencias multiples en el aula','9789875000329',7, '1998/02/06'),
 (3,'Linux a Fondo', '9789875262454',4,'2002/06/03'),
 (4, 'Sepa como usar su PC al maximo', '9789875261334',4,'2001/08/09'),
 (5,'CLIPPER 5.2','9788448119169',5,'2007/03/09'),
 (6,'NovellIntranetWare/NetWare5', '9788483220709',3,'1998/07/15'),
 (7, 'Tecnologías de Interconectividad de Redes', '9789701701712', 3, '1997/05/20'),
 (8, 'Delphi 5', '9788441509948', 9, '2002/02/19'),
 (9, 'Redes Locales', '9788478979233', 1, '2008/01/09'),
 (10, 'Data Centers hoy', '9789871609413', 11, '2012/07/17'),
 (11,'El libro del PC','9788478979318',1,'2011/05/03'),
 (12, 'Etica informática y Etica e internet','9788484076445', 10, '2011/10/15'),
 (13,'Programacion en turbo pascal', '9788476154496', 2, '2001/09/12'),
 (14, 'Sistemas Operativos Monopuesto','9788478979219',1, '2007/04/06'),
 (15, 'AutoCAD 2010' ,'9788441526754', 13, '2007/04/07'),
 (16, 'DYANE Version 4' ,'9788436822960', 6, '2005/07/10'),
 (17,'Windows Me Milleniu Edition','9789875260835',4,'2000/02/25'),
 (18, 'Quark Xpress 8', '9788478979561', 1, '2009/02/02'),
 (19, 'Pascal esencial','9788441508788',14,'2005/06/03'),
 (20, 'Guia completa de Excell version 2002','9788448132415',5, '2001/01/05'),
 (21, 'La Biblia de Linux', '9789875261204', 4, '2002/02/07'),
 (22, 'Sitios web bajo Linux', '9789875260740', 4, '2000/08/23'),
 (23, 'S.O.S. PC', '9789875262355', 4, '2002/01/04'),
 (24, 'Blogs', '9789876630337', 4, '1999/05/09');

insert into libroautor values 
(11,22),
(1,10),
(6,15),
(3,12),
(21,12), 
(4,13), 
(23,13), 
(22,12), 
(24,8), 
(5,14), 
(7,16), 
(14,28), 
(15,32), 
(16,33), 
(18,41), 
(20,34), 
(2,11), 
(12,23), 
(13,24), 
(9,20), 
(10,21), 
(8,17), 
(17,40), 
(19,17);  

  

insert into ejemplar(codlibro, prestado)values
(1,0),
(1,1),
(1,0),
(2,0),
(2,0),
(2,0),
(3,0),
(3,0),
(3,0),
(4,1),
(4,1),
(4,1),
(4,1),
(5,1),
(5,1),
(5,1),
(6,0),
(6,0),
(6,0),
(7,0),
(7,0),
(7,0),
(8,0),
(8,0),
(8,0),
(9,0),
(9,0),
(10,0),
(10,0),
(10,0),
(11,0),
(12,0),
(12,0),
(12,0),
(13,0),
(13,0),
(13,0),
(14,0),
(14,0),
(15,0),
(15,0),
(16,0),
(17,0),
(17,1),
(17,1),
(18,0),
(18,0),
(19,1),
(20,0),
(20,1),
(21,0),
(21,0),
(22,1),
(22,1),
(23,0),
(23,0),
(24,0),
(24,1),
(24,0);

insert into Prestamo (CodSocio,CodEjem,FPrestamo,FDevolucion,Ftope) values
(3, 1, '2023/02/28','2023/03/06' , '2023/03/07'),
(4, 33, '2023/03/01', '2023/03/10', '2023/03/10'),
(7, 22, '2023/03/15','2023/03/22', '2015/03/24'),
(8, 41, '2023/03/19','2023/03/26', '2023/03/28'),
(3, 2, '2023/08/7', NULL , '2023/08/14'),
(4, 10,  '2023/08/7', NULL , '2023/08/14'),
(7, 11, '2023/08/7', NULL , '2023/08/14'),
(8, 12, '2023/08/7', NULL , '2023/08/14'),
(12, 13, '2023/08/7', NULL , '2023/08/14'),
(15, 14, '2023/08/7', NULL , '2023/08/14'),
(10, 15, '2023/08/7', NULL , '2023/08/14'),
(11, 16, '2023/08/7', NULL , '2023/08/14'),
(14, 44, '2023/08/7', NULL , '2023/08/14'),
(10, 45, '2023/08/7', NULL , '2023/08/14'),
(19, 48, '2023/08/7', NULL , '2023/08/14'),
(11, 50, '2023/08/7', NULL , '2023/08/14'),
(10, 53, '2023/08/7', NULL , '2023/08/14'),
(1, 54, '2023/08/7', NULL , '2023/08/14'),
(2, 58, '2023/08/7', NULL , '2023/08/14');


