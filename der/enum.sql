create type restaurante.estado_mesa AS enum (
	'DISPONIBLE', 'RESERVADO'
);

alter table restaurante.mesas drop column estado_mesa;
alter table restaurante.mesas add column estado restaurante.estado_mesa;
alter table restaurante.mesas alter column estado set default 'DISPONIBLE';

ALTER TABLE restaurante.clientes 
ADD CONSTRAINT cedula_uk UNIQUE (cedula);

--------------

create type restaurante.estado_cabecera AS enum (
	'ABIERTO', 'CERRADO'
);

alter table restaurante.cabeceras drop column estado;
alter table restaurante.cabeceras add column estado restaurante.estado_cabecera;
alter table restaurante.cabeceras alter column estado set default 'ABIERTO';