using System.Data;
using System.Data.SqlClient;
using Modelos;
using System;

namespace Datos
{
    public class DatosEmpleado
    {
        private static DataTable DT = new DataTable();
        private static int Estado = 0;

        //----------------------------------------------------AgregarEmpleado-----------------------------------------------------------
        public static DataTable AgregarEmpleado(ModeloEmpleado Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPAgregarEmpleado");
                Comando.Parameters.AddWithValue("@_nombre_completo", Modelo.nombre_completo);
                Comando.Parameters.AddWithValue("@_dpi", Modelo.dpi);
                Comando.Parameters.AddWithValue("@_cantidad_hijos", Modelo.cantidad_hijos);
                Comando.Parameters.AddWithValue("@_salario_base", Modelo.salario_base);
                Comando.Parameters.AddWithValue("@_bono_decreto", Modelo.bono_decreto);
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

        //----------------------------------------------------ActualizarEmpleado-----------------------------------------------------------
        public static DataTable ActualizarEmpleado(ModeloEmpleado Modelo)
        {

            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPActualizarEmpleado");
                Comando.Parameters.AddWithValue("@_id", Modelo.id);
                Comando.Parameters.AddWithValue("@_nombre_completo", Modelo.nombre_completo);
                Comando.Parameters.AddWithValue("@_dpi", Modelo.dpi);
                Comando.Parameters.AddWithValue("@_cantidad_hijos", Modelo.cantidad_hijos);
                Comando.Parameters.AddWithValue("@_salario_base", Modelo.salario_base);
                Comando.Parameters.AddWithValue("@_bono_decreto", Modelo.bono_decreto);
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

        //----------------------------------------------------ObtenerEmpleado-----------------------------------------------------------
        public static DataTable ObtenerEmpleados(ModeloEmpleado Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPObtenerEmpleados");

                DT = Conexion.EjecutarComandoSelect(Comando);
                DT = Funciones.AgregarEstadoToken(DT, Estado.ToString());
            }
            else
            {
                DT = Funciones.AgregarEstadoToken(DT, "0");
            }

            return DT;
        }

        //----------------------------------------------------ObtenerDatosEmpleado-----------------------------------------------------------
        public static DataTable ObtenerDatosEmpleado(ModeloEmpleado Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPObtenerDatosEmpleado");
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

        //----------------------------------------------------EliminarEmpleado-----------------------------------------------------------
        public static DataTable EliminarEmpleado(ModeloEmpleado Modelo)
        {
            Estado = Funciones.ObtenerEstadoToken(Modelo.token);
            DT.Clear();

            // 0 expirado, 1 vigente
            if (Estado == 1)
            {
                SqlCommand Comando = Conexion.CrearComandoProc("dbo.SPEliminarEmpleado");
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
    }
}
