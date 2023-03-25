using System.Data;
using System.Data.SqlClient;
using Modelos;
using System;

namespace Datos
{
    public class DatosUsuario
    {
        private static readonly Funciones Funciones = new Funciones();
        private static readonly int vigencia_minutos = 90;
        private static DataTable DT = new DataTable();
        private static int Estado = 0;

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
                SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPActualizarUsuario");
                Comando.Parameters.AddWithValue("@_id", Modelo.id);
                Comando.Parameters.AddWithValue("@_nombre", Modelo.nombre);
                Comando.Parameters.AddWithValue("@_usuario", Modelo.usuario);
                Comando.Parameters.AddWithValue("@_contasenia", Funciones.SeguridadSHA512(Modelo.contasenia));
                Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
                Comando.Parameters.AddWithValue("@_nacimiento", Modelo.nacimiento);
                Comando.Parameters.AddWithValue("@_modificado_el", DateTime.Now.ToString("dd/MM/yyyy"));
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
                SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPObtenerUsuarios");

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
                SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPObtenerDatosUsuario");
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
                SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPEliminarUsuario");
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
            SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPInicioDeSesion");
            Comando.Parameters.AddWithValue("@_correo", Modelo.correo);
            Comando.Parameters.AddWithValue("@_contasenia", Funciones.SeguridadSHA512(Modelo.contasenia));
            Comando.Parameters.AddWithValue("@_token", Funciones.GenerarTokeDeSesion());
            Comando.Parameters.AddWithValue("@_vigencia_minutos", vigencia_minutos);

            return Conexion.EjecutarComandoSelect(Comando);
        }
    }
}
