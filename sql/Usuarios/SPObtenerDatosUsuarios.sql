CREATE PROC dbo.SPObtenerDatosUsuarios(@_id NVARCHAR(40))
AS
BEGIN
	SELECT
		a.id,
		a.nombre,
		a.usuario,
		a.contasenia,
		a.correo,
		a.nacimiento,
		a.agregado_el,
		a.modificado_el
	FROM dbo.incomel_usuario as a
	WHERE a.id = @_id
END