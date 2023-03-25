CREATE PROC dbo.SPEliminarUsuarios(@_id INT)
AS
DECLARE @_filas_afectadas TINYINT,
		@_resultado INT
BEGIN
		BEGIN TRAN
			BEGIN TRY
				UPDATE dbo.incomel_usuario
				SET estado = 0
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