CREATE PROC dbo.SPObtenerEstadoToken(@_token NVARCHAR(250))
AS
DECLARE @_estado_token TINYINT = 0
BEGIN
	SELECT @_estado_token = dbo.FnVerificarVigenciaToken(@_token)
	IF(@_estado_token = 1)
		BEGIN
			EXEC dbo.SPActualizarVigenciaToken @_token
		END

	SELECT EstadoToken = @_estado_token
END