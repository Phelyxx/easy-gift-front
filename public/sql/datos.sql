-- Database: easygift

-- DROP DATABASE IF EXISTS easygift;

delete from carrito_entity;
delete from categoria_entity;
delete from categoria_entity_regalos_regalo_entity;
delete from categoria_entity_usuarios_usuario_entity;
delete from tienda_entity_regalos_regalo_entity;
delete from regalo_entity;
delete from resena_entity;
delete from tienda_entity;
delete from usuario_entity_amigos_usuario_entity;
delete from usuario_entity_intereses_categoria_entity;
delete from wishlist_entity;
delete from localizacion_entity;
delete from resena_entity;
delete from wishlist_entity;
delete from usuario_entity ;

insert into usuario_entity (id, nombre, bio, usuario, cumpleanios, edad, "rutaFotoPerfil", "rutaFotoPortada",genero, presupuesto, "disponibilidadDeTiempo",email) values ('a0eebc99-9c0b-4ef8-bb6d-000000000001', 'Juana Castro', 'Me gusta la astronomia y jugar con mis perros', 'juanacastro01', '2000-12-10', 21, 'www.a.com', 'www.a.com', 'Femenino',30000,'Poco', 'a@g.com');


insert into localizacion_entity ( id,latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000001',14.1912, 29.1305, 'Calle 20 # 82-52 Local 437 - 138 - 139', 'Bogota D.C', 'Colombia', 110182, TRUE  );
insert into localizacion_entity (id, latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000002',14.1912, 29.1302, 'Calle 10 # 72-52 Local 437 - 138 - 139', 'Bogota D.C', 'Colombia', 110184, TRUE  );
insert into localizacion_entity (id, latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000003',14.1912, 29.1304, 'Calle 25 # 62-52 Local 237 - 139', 'Bogota D.C', 'Colombia', 110185, TRUE  );
insert into localizacion_entity (id, latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000004',14.13152, 29.1305, 'Calle 10 # 72-52 Local 137 - 138 - 139', 'Bogota D.C', 'Colombia', 110186, TRUE  );
insert into localizacion_entity (id, latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000005',14.1915, 29.1305, 'Calle 40 # 62-52 Local 437 ', 'Bogota D.C', 'Colombia', 110132, TRUE  );
insert into localizacion_entity (id, latitud, longitud, direccion, ciudad, pais, "codigoPostal","esActual") values ('a0eebc99-9c0b-4ef8-bb6d-000000000006',14.1312, 29.1301, 'Calle 10 # 72-52', 'Bogota D.C', 'Colombia', 110282, TRUE  );

insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000001','Alkosto', '/images/tienda_0.png','Esta es la descripcion de la tienda', 'www.alkosto.com.co' , 6013213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000002','Tienda Hogar', '/images/tienda_1.png','Esta es la descripcion de la tienda', 'www.google.com.co' , 32113213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000002');
insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000003','Hasbro', '/images/tienda_2.png','Esta es la descripcion de la tienda', 'https://shop.hasbro.com/' , 62313213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000003');
insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','Adidas', '/images/tienda_3.png','Esta es la descripcion de la tienda', 'www.alkosto.com.co' , 41213213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000004');
insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000005','Zara Home', '/images/tienda_4.png','Esta es la descripcion de la tienda', 'www.alkosto.com.co' , 61313213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000005');
insert into tienda_entity ( id, nombre, imagen, descripcion, "paginaWeb", telefono, "ubicacionId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000006','Liquor Store', '/images/tienda_5.png','Esta es la descripcion de la tienda', 'www.alkosto.com.co' , 113213 ,'a0eebc99-9c0b-4ef8-bb6d-000000000006');

insert into wishlist_entity( id, nombre, descripcion, imagen, "usuarioId") values ('a0eebc99-9c0b-4ef8-bb6d-000000000001','Regalos de Amor y Amistad', 'Esta lista contiene los regalos que he visto en EasyGift y que me gustaría que me regalaran en amor y amistad.', '/images/wishlist-0.avif', 'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into wishlist_entity( id, nombre, descripcion, imagen, "usuarioId") values ('a0eebc99-9c0b-4ef8-bb6d-000000000002','Regalos de Navidad', 'Esta lista contiene los regalos que he visto en EasyGift y que me gustaría que me regalaran en navidad.', '/images/wishlist-1.avif', 'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into wishlist_entity( id, nombre, descripcion, imagen, "usuarioId") values ('a0eebc99-9c0b-4ef8-bb6d-000000000003','Regalos Deportivos', 'Esta lista contiene los regalos que he visto en EasyGift y que me gustaría que me regalaran de cumpleanios.', '/images/wishlist-2.avif', 'a0eebc99-9c0b-4ef8-bb6d-000000000001');

insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000001', 'Regalo 1','Esta es la descripción del regalo.','/images/regalo-0.avif',41.00, 'Genero 1', 5.0, 'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000002', 'Regalo 2','Esta es la descripción del regalo.','/images/regalo-1.avif',25.00, 'Genero 1', 4.5, 'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000003', 'Regalo 3','Esta es la descripción del regalo.','/images/regalo-2.avif',35.00, 'Genero 2', 4.2, 'a0eebc99-9c0b-4ef8-bb6d-000000000001');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000004', 'Regalo 4','Esta es la descripción del regalo.','/images/regalo-3.avif',45.00, 'Genero 1', 4.1, 'a0eebc99-9c0b-4ef8-bb6d-000000000002');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000005', 'Regalo 5','Esta es la descripción del regalo.','/images/regalo-4.avif',14.00, 'Genero 2', 4.5, 'a0eebc99-9c0b-4ef8-bb6d-000000000002');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000006', 'Regalo 6','Esta es la descripción del regalo.','/images/regalo-5.avif',15.00, 'Genero 2', 4.4, 'a0eebc99-9c0b-4ef8-bb6d-000000000002');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000007', 'Regalo 7','Esta es la descripción del regalo.','/images/regalo-6.avif',43.00, 'Genero 3', 2.5, 'a0eebc99-9c0b-4ef8-bb6d-000000000003');
insert into regalo_entity (id, nombre, descripcion, imagen, "precioPromedio", genero, "calificacionPromedio", "wishlistId") values ('a0eebc99-9c0b-4ef8-bb6d-140000000008', 'Regalo 8','Esta es la descripción del regalo.','/images/regalo-7.avif',15.00, 'Genero 3', 3.4, 'a0eebc99-9c0b-4ef8-bb6d-000000000003');

insert into categoria_entity (id, nombre) values ('a0eebc99-9c0b-4ef8-bb6d-200000000001', 'Fashion' );
insert into categoria_entity (id, nombre) values ('a0eebc99-9c0b-4ef8-bb6d-200000000002', 'Accessories' );
insert into categoria_entity (id, nombre) values ('a0eebc99-9c0b-4ef8-bb6d-200000000003', 'Comida' );
insert into categoria_entity (id, nombre) values ('a0eebc99-9c0b-4ef8-bb6d-200000000004', 'Juguetes' );
insert into categoria_entity (id, nombre) values ('a0eebc99-9c0b-4ef8-bb6d-200000000005', 'Navidad' );





insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000001');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000002');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000003');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000004');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000005');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000006');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000007');
insert into tienda_entity_regalos_regalo_entity ("tiendaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-100000000004','a0eebc99-9c0b-4ef8-bb6d-140000000008');

insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000001');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000002');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000003');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000004');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000005');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000001','a0eebc99-9c0b-4ef8-bb6d-140000000006');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000002','a0eebc99-9c0b-4ef8-bb6d-140000000007');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('a0eebc99-9c0b-4ef8-bb6d-200000000002','a0eebc99-9c0b-4ef8-bb6d-140000000008');



INSERT INTO carrito_entity (id, "fechaCreacion")
VALUES ('6dba5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('643a5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('8fba5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('8fba5215-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('6fca5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('6f3a5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('7f3a5211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('8f395211-95de-49dd-9acb-ad923f466679', '11/11/2022'),
('7f7a5211-95de-49dd-9acb-ad923f466679', '11/10/2022'),
('7f3a5761-95de-49dd-9acb-ad923f466679', '11/09/2022');


INSERT INTO categoria_entity (id, nombre)
VALUES ('643a5211-95de-49dd-9acb-ad923f466679', 'Moda'),
('8fba5211-95de-49dd-9acb-ad923f466679', 'Joyeria'),
('8fba5215-95de-49dd-9acb-ad923f466679', 'Deportes'),
('6fca5211-95de-49dd-9acb-ad923f466679', 'Libros'),
('6f3a5211-95de-49dd-9acb-ad923f466679', 'Tecnologia'),
('7f3a5211-95de-49dd-9acb-ad923f466679', 'Juguetes'),
('7f3a5211-95de-49dd-9acb-ad223f466679', 'Maquillaje'),
('7f3a5211-95de-49dd-9acb-ad223f462679', 'Hogar'),
('7f3a5211-95de-49dd-9acb-ad293f466179', 'Instrumentos musicales'),
('7f3a5211-95de-49dd-9acb-ad243f466179', 'Technology'),
('7f3a5211-95de-49dd-9acb-ad243f466119', 'Home'),
('7f3a5211-95de-49dd-9acb-ad243f466129', 'Fashion'),
('7f3a5211-95de-49dd-9acb-ad243f466139', 'VideoGames'),
('7f3a5211-95de-49dd-9acb-ad243f466149', 'Furniture'),
('7f3a5211-95de-49dd-9acb-ad243f466159', 'Kitchen');





insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad923f466679','a0eebc99-9c0b-4ef8-bb6d-140000000001');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad223f466679','a0eebc99-9c0b-4ef8-bb6d-140000000002');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad223f462679','a0eebc99-9c0b-4ef8-bb6d-140000000003');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad923f466679','a0eebc99-9c0b-4ef8-bb6d-140000000004');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad223f466679','a0eebc99-9c0b-4ef8-bb6d-140000000007');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad293f466179','a0eebc99-9c0b-4ef8-bb6d-140000000008');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466179','a0eebc99-9c0b-4ef8-bb6d-140000000001');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466179','a0eebc99-9c0b-4ef8-bb6d-140000000002');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466119','a0eebc99-9c0b-4ef8-bb6d-140000000003');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466129','a0eebc99-9c0b-4ef8-bb6d-140000000004');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466139','a0eebc99-9c0b-4ef8-bb6d-140000000007');
insert into categoria_entity_regalos_regalo_entity ("categoriaEntityId","regaloEntityId") values ('7f3a5211-95de-49dd-9acb-ad243f466149','a0eebc99-9c0b-4ef8-bb6d-140000000008');
