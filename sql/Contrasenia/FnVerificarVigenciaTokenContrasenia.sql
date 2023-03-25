CREATE FUNCTION dbo.FnVerificarVigenciaTokenContrasenia( @_token_contrasenia NVARCHAR(250))

RETURNS TINYINT
AS
BEGIN
	DECLARE @_resultado TINYINT, @_vigencia_minutos INT = 30, @_creacion DATETIME = '2001-01-01 01:01:01.001', 
			@_fecha_actual DATETIME = getDate(), @_tiempo_minutos INT
	SELECT
		@_vigencia_minutos = a.tiempo_token_contrasenia,
		@_creacion = a.agregado_token_contrasenia
	FROM dbo.incomel_usuario AS a
	WHERE a.token_contrasenia = @_token_contrasenia
		AND a.estado = 1

	SET @_tiempo_minutos = DATEDIFF(MINUTE, @_creacion, @_fecha_actual)

	IF(@_tiempo_minutos > @_vigencia_minutos)
		BEGIN
			SET @_resultado = 0
		END
	ELSE
		BEGIN
			SET @_resultado = 1
		END

	RETURN @_resultado
END