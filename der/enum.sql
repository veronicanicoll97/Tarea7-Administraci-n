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


----------
ALTER TABLE restaurante.cabeceras ALTER COLUMN fecha_hora_inicio_consumo TYPE timestamp with time zone USING fecha_hora_inicio_consumo::timestamp with time zone;
ALTER TABLE restaurante.cabeceras ALTER COLUMN fecha_hora_fin_consumo TYPE timestamp with time zone USING fecha_hora_fin_consumo::timestamp with time zone;
ALTER TABLE restaurante.reservas ALTER COLUMN hora_inicio_reserva TYPE time with time zone USING hora_inicio_reserva::time with time zone;
ALTER TABLE restaurante.reservas ALTER COLUMN hora_fin_reserva TYPE time with time zone USING hora_fin_reserva::time with time zone;

-----

create type restaurante.estado_reserva AS enum (
	'ACTIVO', 'FINALIZADO'
);

alter table restaurante.reservas add column estado restaurante.estado_reserva;
alter table restaurante.reservas alter column estado set default 'ACTIVO';