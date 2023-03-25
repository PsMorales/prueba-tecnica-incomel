CREATE PROC dbo.SPAgregarEmpleado(@_nombre_completo NVARCHAR(100), @_dpi NVARCHAR(20), @_cantidad_hijos INT, @_salario_base DECIMAL(10, 2), @_bono_decreto DECIMAL(7, 2), @_token NVARCHAR(250))	
AS
DECLARE @_filas_afecadas TINYINT, @_resultado SMALLINT , @_id_usuario NVARCHAR(40)

BEGIN
BEGIN TRAN
	SELECT @_id_usuario = b.usuario_id
	FROM dbo.incomel_token AS b
	WHERE b.token = @_token

	BEGIN TRY
		INSERT INTO dbo.incomel_empleado(nombre_completo, dpi, cantidad_hijos, salario_base, bono_decreto, agregado_por)
		VALUES(@_nombre_completo, @_dpi, @_cantidad_hijos, @_salario_base, @_bono_decreto, @_id_usuario)
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