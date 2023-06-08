
CREATE SEQUENCE restaurante.categorias_id_categoria_seq;

CREATE TABLE restaurante.categorias (
                id_categoria INTEGER NOT NULL DEFAULT nextval('restaurante.categorias_id_categoria_seq'),
                nombre VARCHAR NOT NULL,
                CONSTRAINT categorias_pk PRIMARY KEY (id_categoria)
);


ALTER SEQUENCE restaurante.categorias_id_categoria_seq OWNED BY restaurante.categorias.id_categoria;

CREATE SEQUENCE restaurante.productos_id_producto_seq;

CREATE TABLE restaurante.productos (
                id_producto INTEGER NOT NULL DEFAULT nextval('restaurante.productos_id_producto_seq'),
                nombre_producto VARCHAR NOT NULL,
                precio_venta NUMERIC NOT NULL,
                id_categoria INTEGER NOT NULL,
                CONSTRAINT productos_pk PRIMARY KEY (id_producto)
);


ALTER SEQUENCE restaurante.productos_id_producto_seq OWNED BY restaurante.productos.id_producto;

CREATE SEQUENCE restaurante.restaurantes_id_restaurante_seq;

CREATE TABLE restaurante.restaurantes (
                id_restaurante INTEGER NOT NULL DEFAULT nextval('restaurante.restaurantes_id_restaurante_seq'),
                nombre VARCHAR NOT NULL,
                direccion VARCHAR NOT NULL,
                CONSTRAINT restaurantes_pk PRIMARY KEY (id_restaurante)
);


ALTER SEQUENCE restaurante.restaurantes_id_restaurante_seq OWNED BY restaurante.restaurantes.id_restaurante;

CREATE SEQUENCE restaurante.mesas_id_mesa_seq;

CREATE TABLE restaurante.mesas (
                id_mesa INTEGER NOT NULL DEFAULT nextval('restaurante.mesas_id_mesa_seq'),
                nombre_mesa VARCHAR NOT NULL,
                posicion_x REAL NOT NULL,
                posicion_y INTEGER NOT NULL,
                capacidad_x_mesa INTEGER NOT NULL,
                estado_mesa VARCHAR DEFAULT 'DISPONIBLE' NOT NULL,
                id_restaurante INTEGER NOT NULL,
                nro_piso INTEGER DEFAULT 1 NOT NULL,
                CONSTRAINT mesas_pk PRIMARY KEY (id_mesa)
);


ALTER SEQUENCE restaurante.mesas_id_mesa_seq OWNED BY restaurante.mesas.id_mesa;

CREATE SEQUENCE restaurante.clientes_id_cliente_seq;

CREATE TABLE restaurante.clientes (
                id_cliente INTEGER NOT NULL DEFAULT nextval('restaurante.clientes_id_cliente_seq'),
                cedula VARCHAR NOT NULL,
                nombres VARCHAR NOT NULL,
                apellidos VARCHAR NOT NULL,
                CONSTRAINT clientes_pk PRIMARY KEY (id_cliente)
);


ALTER SEQUENCE restaurante.clientes_id_cliente_seq OWNED BY restaurante.clientes.id_cliente;

CREATE SEQUENCE restaurante.cabeceras_id_cabecera_seq;

CREATE TABLE restaurante.cabeceras (
                id_cabecera INTEGER NOT NULL DEFAULT nextval('restaurante.cabeceras_id_cabecera_seq'),
                estado VARCHAR DEFAULT 'ABIERTO' NOT NULL,
                total NUMERIC DEFAULT 0 NOT NULL,
                fecha_hora_inicio_consumo TIMESTAMP NOT NULL,
                fecha_hora_fin_consumo TIMESTAMP NOT NULL,
                id_mesa INTEGER NOT NULL,
                id_cliente INTEGER NOT NULL,
                CONSTRAINT cabeceras_pk PRIMARY KEY (id_cabecera)
);


ALTER SEQUENCE restaurante.cabeceras_id_cabecera_seq OWNED BY restaurante.cabeceras.id_cabecera;

CREATE SEQUENCE restaurante.detalles_id_detalle_seq;

CREATE TABLE restaurante.detalles (
                id_detalle INTEGER NOT NULL DEFAULT nextval('restaurante.detalles_id_detalle_seq'),
                id_producto INTEGER NOT NULL,
                cantidad INTEGER NOT NULL,
                id_cabecera INTEGER NOT NULL,
                CONSTRAINT detalles_pk PRIMARY KEY (id_detalle)
);


ALTER SEQUENCE restaurante.detalles_id_detalle_seq OWNED BY restaurante.detalles.id_detalle;

CREATE SEQUENCE restaurante.reservas_id_reserva_seq;

CREATE TABLE restaurante.reservas (
                id_reserva INTEGER NOT NULL DEFAULT nextval('restaurante.reservas_id_reserva_seq'),
                fecha_reserva DATE NOT NULL,
                hora_inicio_reserva TIME NOT NULL,
                hora_fin_reserva TIME NOT NULL,
                cantidad_mesa INTEGER NOT NULL,
                id_cliente INTEGER NOT NULL,
                id_mesa INTEGER NOT NULL,
                CONSTRAINT reservas_pk PRIMARY KEY (id_reserva)
);


ALTER SEQUENCE restaurante.reservas_id_reserva_seq OWNED BY restaurante.reservas.id_reserva;

ALTER TABLE restaurante.productos ADD CONSTRAINT categorias_productos_fk
FOREIGN KEY (id_categoria)
REFERENCES restaurante.categorias (id_categoria)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.detalles ADD CONSTRAINT productos_detalles_fk
FOREIGN KEY (id_producto)
REFERENCES restaurante.productos (id_producto)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.mesas ADD CONSTRAINT restaurantes_mesas_fk
FOREIGN KEY (id_restaurante)
REFERENCES restaurante.restaurantes (id_restaurante)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.reservas ADD CONSTRAINT mesas_reservas_fk
FOREIGN KEY (id_mesa)
REFERENCES restaurante.mesas (id_mesa)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.cabeceras ADD CONSTRAINT mesas_cabeceras_fk
FOREIGN KEY (id_mesa)
REFERENCES restaurante.mesas (id_mesa)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.reservas ADD CONSTRAINT clientes_reservas_fk
FOREIGN KEY (id_cliente)
REFERENCES restaurante.clientes (id_cliente)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.cabeceras ADD CONSTRAINT clientes_cabeceras_fk
FOREIGN KEY (id_cliente)
REFERENCES restaurante.clientes (id_cliente)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE restaurante.detalles ADD CONSTRAINT cabeceras_detalles_fk
FOREIGN KEY (id_cabecera)
REFERENCES restaurante.cabeceras (id_cabecera)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;