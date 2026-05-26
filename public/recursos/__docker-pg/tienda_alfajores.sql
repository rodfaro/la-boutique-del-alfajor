-- Conectar a la base de datos 'tienda'
\c tienda_alfajores;

-- Crear la tabla 'productos'
CREATE TABLE Productos (
    IdProducto SERIAL PRIMARY KEY,
    Nombre VARCHAR(400),
    Precio NUMERIC(10, 2),
    Img VARCHAR(100)
);

-- Insertar 10 productos deportivos
INSERT INTO Productos (Nombre, Precio, Img) VALUES
('Alfajor clásico con dulce de leche', 2700, 'ImgDulceDDL'),

('Alfajor clásico blanco', 2700, 'ImgClasicoBlanco'),

('Alfajor negro con chocolates', 2700, 'ImgAlfajorNegro'),

('Alfajores de chocolate con dulce de leche', 12000, 'ImgChocolateyDDL'),

('Alfajores de Maicena Clasico', 23000, 'ImgAlfajorMaicena'),

('Alfajores de Mousse', 31000, 'ImgMousse'),

('Alfajores de maicena con pistacho', 43000, 'ImgAlfajorPistacho'),

('Alfajores de maicena con pistacho 2', 42000, 'ImgAlfajorPistacho2');
