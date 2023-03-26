using System.Data;
using System.Data.SqlClient;
using Modelos;
using System;
using System.Web.Configuration;

namespace Datos
{
    public class DatosUsuario
    {
        private static readonly Funciones Funciones = new Funciones();
        private static readonly int vigencia_minutos = 90;
        private static DataTable DT = new DataTable();
        private static int Estado = 0;
        private static string vigencia_contrasenia = WebConfigurationManager.AppSettings["VigenciaContrasenia"].ToString();

        //----------------------------------------------------AgregarUsuario-----------------------------------------------------------
        public static DataTable AgregarUsuario(ModeloUsuario Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPAgregarUsuario");
                Comando.Parameters.AddWithValue("@_nombre", Modelo.nombre);
                Comando.Parameters.AddWithValue("@_usuario", Modelo.usuario);
                Comando.Parameters.AddWithValue("@_contasenia", Funciones.SeguridadSHA512(Modelo.contasenia));
                Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
                Comando.Parameters.AddWithValue("@_nacimiento", Modelo.nacimiento);
                Comando.Parameters.AddWithValue("@_token", Modelo.token);

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------ActualizarUsuario-----------------------------------------------------------
        public static DataTable ActualizarUsuario(ModeloUsuario Modelo)
        {

            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPActualizarUsuario");
                Comando.Parameters.AddWithValue("@_id", Modelo.id);
                Comando.Parameters.AddWithValue("@_nombre", Modelo.nombre);
                Comando.Parameters.AddWithValue("@_usuario", Modelo.usuario);
                Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
                Comando.Parameters.AddWithValue("@_nacimiento", Modelo.nacimiento);
                Comando.Parameters.AddWithValue("@_token", Modelo.token);

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------ObtenerUsuarios-----------------------------------------------------------
        public static DataTable ObtenerUsuarios(ModeloUsuario Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPObtenerUsuarios");

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------ObtenerDatosUsuario-----------------------------------------------------------
        public static DataTable ObtenerDatosUsuario(ModeloUsuario Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPObtenerDatosUsuario");
                Comando.Parameters.AddWithValue("@_id", Modelo.id);

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------EliminarUsuario-----------------------------------------------------------
        public static DataTable EliminarUsuario(ModeloUsuario Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPEliminarUsuarios");
                Comando.Parameters.AddWithValue("@_id", Modelo.id);

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------InicioDeSesion-----------------------------------------------------------
        public static DataTable InicioDeSesion(ModeloUsuario Modelo)
        {
            SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPInicioDeSesion");
            Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
            Comando.Parameters.AddWithValue("@_contasenia", Funciones.SeguridadSHA512(Modelo.contasenia));
            Comando.Parameters.AddWithValue("@_token", Funciones.GenerarTokeDeSesion());
            Comando.Parameters.AddWithValue("@_vigencia_minutos", vigencia_minutos);

            return Conexion.EjecutarComandoSelect(Comando);
        }

        //----------------------------------------------------EmailRecuperaContrasenia-----------------------------------------------------------
        public static DataTable EmailRecuperarContrasenia(ModeloUsuario Modelo)
        {
            DT.Clear();

            string token = Funciones.GenerarTokeDeSesion();
            int vigencia = Int32.Parse(vigencia_contrasenia);
            SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPRecuperarConrasenia");
            Comando.Parameters.AddWithValue("@_nacimiento", Modelo.nacimiento);
            Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
            Comando.Parameters.AddWithValue("@_token_contrasenia", token);
            Comando.Parameters.AddWithValue("@_tiempo_token_contrasenia", vigencia);

            DT = Conexion.EjecutarComandoSelect(Comando);
            DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            if (Convert.ToInt32(DT.Rows[0][0].ToString()) == 1)
            {
                Funciones.EnviarEmailContrasenia(Modelo.correo, vigencia, token);
            }

            return DT;
        }

        //----------------------------------------------------cambioContrasenia-----------------------------------------------------------
        public static DataTable CambiarContrasenia(ModeloUsuario Modelo)
        {
            Estado = Funciones.ObtenerEstadoTokenContrasenia(Modelo.token_contrasenia);
            DT.Clear();

            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPCambiarContrasenia");
                Comando.Parameters.AddWithValue("@_contasenia", Funciones.SeguridadSHA512(Modelo.contasenia));
                Comando.Parameters.AddWithValue("@_token_contrasenia", Modelo.token_contrasenia);

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }
    }
}
