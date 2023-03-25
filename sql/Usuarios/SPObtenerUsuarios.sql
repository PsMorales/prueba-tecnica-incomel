--Obtener usuario
CREATE PROC dbo.SPObtenerUsuarios
AS
BEGIN
	SELECT
		a.id,
		a.nombre,
		a.usuario,
		a.correo,
		a.nacimiento,
		a.agregado_el,
		a.estado
	FROM dbo.incomel_usuario as a
	WHERE a.estado > 0
END