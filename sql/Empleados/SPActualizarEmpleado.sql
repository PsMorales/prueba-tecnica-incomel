CREATE PROC dbo.SPActualizarEmpleado(@_id NVARCHAR(40), @_nombre_completo NVARCHAR(100), @_dpi NVARCHAR(20), @_cantidad_hijos INT, @_salario_base DECIMAL(10, 2), @_bono_decreto DECIMAL(7, 2), @_token NVARCHAR(250))
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
				UPDATE dbo.incomel_empleado
				SET 
					nombre_completo = nombre_completo,
					dpi = @_dpi,
					cantidad_hijos = @_cantidad_hijos,
					salario_base = @_salario_base,
					bono_decreto = @_bono_decreto,
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