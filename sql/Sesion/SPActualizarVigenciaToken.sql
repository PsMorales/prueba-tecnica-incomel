CREATE PROC dbo.SPActualizarVigenciaToken(@_token NVARCHAR(250))

AS
BEGIN
	--eliminar Tokens Expirados
	DELETE dbo.incomel_token
	WHERE estado = 0

	UPDATE dbo.incomel_token
	SET agregado_el = getdate()
	WHERE token = @_token
		AND estado = 1
END