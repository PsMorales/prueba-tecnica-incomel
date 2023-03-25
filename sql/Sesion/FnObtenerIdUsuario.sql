CREATE FUNCTION dbo.FnObtenerIdUsuario(@_token NVARCHAR(250))
RETURNS INT
AS
BEGIN
	DECLARE @_usuario_id INT = 0

	SELECT @_usuario_id = a.usuario_id
	FROM dbo.incomel_token AS a
	WHERE a.token = @_token
		AND a.estado = 1
	RETURN @_usuario_id
END