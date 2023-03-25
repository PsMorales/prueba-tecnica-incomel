--DROP PROCEDURE IF EXISTS dbo.SPAgregarUsuario
CREATE PROC dbo.SPAgregarUsuario(@_nombre NVARCHAR(50), @_usuario NVARCHAR(50), @_contasenia NVARCHAR(130), @_correo NVARCHAR(100), @_nacimiento NVARCHAR(130), @_token NVARCHAR(250))	
AS
DECLARE @_filas_afecadas TINYINT, @_resultado SMALLINT , @_id_usuario NVARCHAR(40)

BEGIN
BEGIN TRAN
	SELECT @_id_usuario = b.usuario_id
	FROM dbo.incomel_token AS b
	WHERE b.token = @_token

	BEGIN TRY
		INSERT INTO dbo.incomel_usuario	(nombre, usuario, contasenia, correo, nacimiento, agregado_por)
		VALUES(@_nombre, @_usuario, @_contasenia, @_correo, @_nacimiento, @_id_usuario)
		SET @_filas_afecadas = @@ROWCOUNT
	END TRY
	BEGIN CATCH
		SET @_filas_afecadas = 0
	END CATCH		

IF (@_filas_afecadas > 0)
		BEGIN
			SET @_Resultado = @_filas_afecadas
			COMMIT
		END
	ELSE
		BEGIN
			SET @_Resultado = 0
			ROLLBACK
		END
	SELECT Resultado = @_Resultado
END 