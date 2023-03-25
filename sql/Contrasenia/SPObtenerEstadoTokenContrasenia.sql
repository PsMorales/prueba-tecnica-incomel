CREATE PROC dbo.SPObtenerEstadoTokenContrasenia(@_token_contrasenia NVARCHAR(250))
AS
DECLARE @_estado_token TINYINT = 0
BEGIN
	SELECT @_estado_token = dbo.FnVerificarVigenciaTokenContrasenia(@_token_contrasenia)

	SELECT EstadoToken = @_estado_token
END