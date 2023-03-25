CREATE PROC dbo.SPCambiarContrasenia(@_contasenia NVARCHAR(130), @_token_contrasenia NVARCHAR(250))
AS
DECLARE @_filas_afectadas TINYINT,
		@_resultado INT
BEGIN
		BEGIN TRAN
			BEGIN TRY
				UPDATE dbo.incomel_usuario
				SET 
					contasenia = @_contasenia,
					token_contrasenia = NULL,
					tiempo_token_contrasenia = NULL,
					agregado_token_contrasenia = NULL
				WHERE token_contrasenia = @_token_contrasenia

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