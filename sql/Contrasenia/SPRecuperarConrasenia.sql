CREATE PROC dbo.SPRecuperarConrasenia(
	@_token_contrasenia NVARCHAR(250), 
	@_tiempo_token_contrasenia INT,
	@_correo NVARCHAR(100),
	@_nacimiento DATE
)
AS
DECLARE 
	@_filas_afectadas TINYINT,
	@_resultado INT
BEGIN
	BEGIN TRAN
		BEGIN TRY
			UPDATE dbo.incomel_usuario
			SET
				token_contrasenia = @_token_contrasenia,
				tiempo_token_contrasenia = @_tiempo_token_contrasenia,
				agregado_token_contrasenia = GETDATE()
			WHERE 
				estado = 1 AND
				correo = @_correo AND
				nacimiento = nacimiento
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