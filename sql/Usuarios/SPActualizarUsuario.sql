CREATE PROC dbo.SPActualizarUsuario(@_id NVARCHAR(40), @_nombre NVARCHAR(50), @_usuario NVARCHAR(50), @_correo NVARCHAR(100), @_nacimiento DATE, @_token NVARCHAR(250))
AS
DECLARE @_filas_afectadas TINYINT,
		@_resultado INT,
		@_id_usuario NVARCHAR(40)
BEGIN
		BEGIN TRAN
			SELECT @_id_usuario = b.usuario_id
			FROM dbo.incomel_token AS b
			WHERE b.token = @_token

			BEGIN TRY
				UPDATE dbo.incomel_usuario
				SET 
					nombre = @_nombre,
					usuario = @_usuario,
					correo = @_correo,
					nacimiento = @_nacimiento,
					modificado_el = GETDATE(),
					modificado_por = @_id_usuario
				WHERE id = @_id

				SET @_filas_afectadas = @@ROWCOUNT
			END TRY
			BEGIN CATCH
				SET @_filas_afectadas = 0
			END CATCH
		IF(@_filas_afectadas > 0)
			BEGIN
				SET @_resultado = @_filas_afectadas
				COMMIT
			END
		ELSE
			BEGIN
				SET @_resultado = 0
				ROLLBACK
			END
		SELECT Resultado = @_Resultado
END