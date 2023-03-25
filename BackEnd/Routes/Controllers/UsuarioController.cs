using Datos;
using Modelos;
using System.Data;
using System.Web.Http;

namespace Routes
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        [Route("api/agregar-usuario")]
        public DataTable AgregarUsuario(ModeloUsuario Modelo)
        {
            return DatosUsuario.AgregarUsuario(Modelo);
        }

        [HttpPost]
        [Route("api/actualizar-usuario")]
        public DataTable ActualizarUsuario(ModeloUsuario Modelo)
        {
            return DatosUsuario.ActualizarUsuario(Modelo);
        }

        [HttpPost]
        [Route("api/obtener-usuarios")]
        public DataTable ObtenerUsuarios(ModeloUsuario Modelo)
        {
            return DatosUsuario.ObtenerUsuarios(Modelo);
        }

        [HttpPost]
        [Route("api/obtener-datosUsuario")]
        public DataTable ObtenerDatosUsuario(ModeloUsuario Modelo)
        {
            return DatosUsuario.ObtenerDatosUsuario(Modelo);
        }

        [HttpPost]
        [Route("api/eliminar-usuario")]
        public DataTable EliminarUsuario(ModeloUsuario Modelo)
        {
            return DatosUsuario.EliminarUsuario(Modelo);
        }

        [HttpPost]
        [Route("api/inicio-sesion")]
        public DataTable InicioDeSesion(ModeloUsuario Modelo)
        {
            return DatosUsuario.InicioDeSesion(Modelo);
        }
    }
}