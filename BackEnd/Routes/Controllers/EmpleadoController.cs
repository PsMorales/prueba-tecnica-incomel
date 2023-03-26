using Datos;
using Modelos;
using System.Data;
using System.Web.Http;

namespace Routes
{
    public class EmpleadoController : ApiController
    {
        [HttpPost]
        [Route("api/agregar-empleado")]
        public DataTable AgregarEmpleado(ModeloEmpleado Modelo)
        {
            return DatosEmpleado.AgregarEmpleado(Modelo);
        }

        [HttpPost]
        [Route("api/actualizar-empleado")]
        public DataTable ActualizarEmpleado(ModeloEmpleado Modelo)
        {
            return DatosEmpleado.ActualizarEmpleado(Modelo);
        }

        [HttpPost]
        [Route("api/obtener-empleados")]
        public DataTable ObtenerEmpleados(ModeloEmpleado Modelo)
        {
            return DatosEmpleado.ObtenerEmpleados(Modelo);
        }

        [HttpPost]
        [Route("api/obtener-datos-empleado")]
        public DataTable ObtenerDatosEmpleado(ModeloEmpleado Modelo)
        {
            return DatosEmpleado.ObtenerDatosEmpleado(Modelo);
        }

        [HttpPost]
        [Route("api/eliminar-empleado")]
        public DataTable EliminarEmpleado(ModeloEmpleado Modelo)
        {
            return DatosEmpleado.EliminarEmpleado(Modelo);
        }
    }
}