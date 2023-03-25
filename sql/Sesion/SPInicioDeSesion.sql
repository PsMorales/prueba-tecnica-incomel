CREATE PROC dbo.SPInicioDeSesion(@_correo NVARCHAR(100), @_contasenia NVARCHAR(130), @_token NVARCHAR(250), @_vigencia_minutos INT)

AS
DECLARE @_usuario_id NVARCHAR(40), @_nombre NVARCHAR(100), @_resultado TINYINT, @_filas_afectadas TINYINT

BEGIN
	SELECT
		@_usuario_id = a.id,
		@_nombre = a.nombre
	FROM dbo.incomel_usuario AS a
	WHERE 
		a.correo = @_correo AND
		a.contasenia = @_contasenia AND
		a.estado = 1

	BEGIN TRAN
		--SELECT 
		--	@_UltimoId = ISNULL(MAX(a.IdToken),0)
		--FROM dbo.incomel_token AS a

		UPDATE dbo.incomel_token
		SET estado = 0
		WHERE usuario_id = @_usuario_id
			AND estado > 0

	BEGIN TRY
		INSERT INTO dbo.incomel_token(usuario_id, token, vigencia_minutos)
		VALUES (@_usuario_id, @_token, @_vigencia_minutos)
		SET @_filas_afectadas = @@ROWCOUNT
	END TRY
	BEGIN CATCH
		SET @_filas_afectadas = 0
	END CATCH

	--determina si se realizo correctamente la transaccion
	IF(@_filas_afectadas > 0)
		BEGIN
			SET @_filas_afectadas = 1
			COMMIT
		END
	ELSE
		BEGIN
			SET @_resultado = 0
			SET	@_token = 'Usuario o contraseña invalida'
			ROLLBACK
		END
	--devolver resultado
	SELECT
		IntResultado = @_resultado,
		TxtToken = @_token,
		TxtUsuario = @_usuario_id
END