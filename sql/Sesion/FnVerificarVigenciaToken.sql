CREATE FUNCTION dbo.FnVerificarVigenciaToken( @_token NVARCHAR(250))

RETURNS TINYINT
AS
BEGIN
	DECLARE @_resultado TINYINT, @_vigencia_minutos INT = 30, @_creacion DATETIME = '2001-01-01 01:01:01.001', 
			@_fecha_actual DATETIME = getDate(), @_tiempo_minutos INT
	SELECT
		@_vigencia_minutos = a.vigencia_minutos,
		@_creacion = a.agregado_el
	FROM dbo.incomel_token AS a
	WHERE a.token = @_token
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