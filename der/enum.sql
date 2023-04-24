create type estado_mesa AS enum (
	'DISPONIBLE', 'RESERVADO'
);

alter table restaurante.mesas drop column estado_mesa;
alter table restaurante.mesas add column estado estado_mesa;
alter table restaurante.mesas alter column estado set default 'DISPONIBLE';

ALTER TABLE restaurante.clientes 
ADD CONSTRAINT cedula_uk UNIQUE (cedula);