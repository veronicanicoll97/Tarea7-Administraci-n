
CREATE SEQUENCE restaurante.mesas_id_mesa_seq;

CREATE TABLE restaurante.mesas (
                id_mesa INTEGER NOT NULL DEFAULT nextval('restaurante.mesas_id_mesa_seq'),
                nombre_mesa VARCHAR NOT NULL,
                posicion_x REAL NOT NULL,
                posicion_y INTEGER NOT NULL,
                capacidad_x_mesa INTEGER NOT NULL,
                estado_mesa VARCHAR DEFAULT 'DISPONIBLE' NOT NULL,
                CONSTRAINT mesas_pk PRIMARY KEY (id_mesa)
);


ALTER SEQUENCE restaurante.mesas_id_mesa_seq OWNED BY restaurante.mesas.id_mesa;

CREATE SEQUENCE restaurante.restaurantes_id_restaurante_seq;

CREATE TABLE restaurante.restaurantes (
                id_restaurante INTEGER NOT NULL DEFAULT nextval('restaurante.restaurantes_id_restaurante_seq'),
                nombre VARCHAR NOT NULL,
                direccion VARCHAR NOT NULL,
                CONSTRAINT restaurantes_pk PRIMARY KEY (id_restaurante)
);


ALTER SEQUENCE restaurante.restaurantes_id_restaurante_seq OWNED BY restaurante.restaurantes.id_restaurante;

CREATE SEQUENCE restaurante.clientes_id_cliente_seq;

CREATE TABLE restaurante.clientes (
                id_cliente INTEGER NOT NULL DEFAULT nextval('restaurante.clientes_id_cliente_seq'),
                cedula VARCHAR NOT NULL,
                nombres VARCHAR NOT NULL,
                apellidos VARCHAR NOT NULL,
                CONSTRAINT clientes_pk PRIMARY KEY (id_cliente)
);


ALTER SEQUENCE restaurante.clientes_id_cliente_seq OWNED BY restaurante.clientes.id_cliente;

CREATE SEQUENCE restaurante.reservas_id_reserva_seq;

CREATE TABLE restaurante.reservas (
                id_reserva INTEGER NOT NULL DEFAULT nextval('restaurante.reservas_id_reserva_seq'),
                fecha_reserva DATE NOT NULL,
                hora_inicio_reserva TIME NOT NULL,
                hora_fin_reserva TIME NOT NULL,
                cantidad_mesa INTEGER NOT NULL,
                id_restaurante INTEGER NOT NULL,
                id_cliente INTEGER NOT NULL,
                id_mesa INTEGER NOT NULL,
                CONSTRAINT reservas_pk PRIMARY KEY (id_reserva)
);


ALTER SEQUENCE restaurante.reservas_id_reserva_seq OWNED BY restaurante.reservas.id_reserva;

ALTER TABLE restaurante.reservas ADD CONSTRAINT mesas_reservas_fk
FOREIGN KEY (id_mesa)
REFERENCES restaurante.mesas (id_mesa)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.reservas ADD CONSTRAINT restaurantes_reservas_fk
FOREIGN KEY (id_restaurante)
REFERENCES restaurante.restaurantes (id_restaurante)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.reservas ADD CONSTRAINT clientes_reservas_fk
FOREIGN KEY (id_cliente)
REFERENCES restaurante.clientes (id_cliente)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;