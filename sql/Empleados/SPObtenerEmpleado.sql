CREATE PROC dbo.SPObtenerDatosEmpleado(@_id NVARCHAR(40))
AS
BEGIN
	SELECT
		a.id,
		a.nombre_completo,
		a.dpi,
		a.cantidad_hijos,
		a.salario_base,
		a.bono_decreto,
		a.agregado_el,
		a.estado
	FROM dbo.incomel_empleado as a
	WHERE a.id = @_id
END