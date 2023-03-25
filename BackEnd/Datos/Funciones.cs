using System;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Configuration;

namespace Datos
{
    public class Funciones
    {
        private static DataTable DT = new DataTable();
        public string lblStatus = "";
        private string codigo_seguridad = "l&d0";
        private static string dominio = WebConfigurationManager.AppSettings["Dominio"].ToString();

        public string SeguridadSHA512(string Pass)
        {
            System.Security.Cryptography.SHA512Managed HashTool = new System.Security.Cryptography.SHA512Managed();
            Byte[] HashByte = Encoding.UTF8.GetBytes(string.Concat(Pass, codigo_seguridad));
            Byte[] encryptedByte = HashTool.ComputeHash(HashByte);
            HashTool.Clear();

            return Convert.ToBase64String(encryptedByte);
        }

        public string GenerarTokeDeSesion()
        {
            Random Rnd = new Random();
            int Aleatorio = Rnd.Next(1, 99999);

            string Hora = DateTime.Now.ToString("hh:mm:ss");
            string Fecha = DateTime.Now.ToString("dd/MM/yyyy");

            string TxtToken = SeguridadSHA512(Fecha + Hora + Aleatorio);

            TxtToken = Regex.Replace(TxtToken, @"[^0-9A-Za-z]", "", RegexOptions.None);

            return TxtToken;
        }

        public static int ObtenerEstadoToken(string token)
        {
            SqlCommand Comando = Conexion.CrearComandoProc("Sesion.SPObtenerEstadoToken");
            Comando.Parameters.AddWithValue("@_token", token);

            DT.Reset();
            DT.Clear();

            DT = Conexion.EjecutarComandoSelect(Comando);
            return Convert.ToInt32(DT.Rows[0][0].ToString());
        }

        public static int ObtenerEstadoTokenContrasenia(string token)
        {
            SqlCommand Comando = Conexion.CrearComandoProc("Sesion.FnVerificarVigenciaTokenContrasenia");
            Comando.Parameters.AddWithValue("@_token_contrasenia", token);

            DT.Reset();
            DT.Clear();

            DT = Conexion.EjecutarComandoSelect(Comando);
            return Convert.ToInt32(DT.Rows[0][0].ToString());
        }

        public static DataTable AgregarEstadoToken(DataTable DT, string Estado)
        {
            if (DT.Rows.Count > 0)
            {
                DT.Columns.Add("estado", typeof(string), Estado).SetOrdinal(0);
            }
            else
            {
                DT.Reset();
                DT.Clear();

                try
                {
                    DataColumn Col = new DataColumn();
                    Col.ColumnName = "estado";
                    DT.Columns.Add(Col);

                    DataRow Fila = DT.NewRow();
                    Fila["estado"] = Estado;
                    DT.Rows.Add(Fila);
                }
                catch
                {
                    DataRow Fila = DT.NewRow();
                    Fila["estado"] = Estado;
                    DT.Rows.Add(Fila);
                }
            }
            return DT;
        }

        public void EnviarEmailContrasenia(string correo, int vigencia)
        {
            string email_origen = "";
            string contrasenia = "";
            
            MailMessage mail_message = new MailMessage(email_origen, correo, "Recuperación de contraseña",
                "<p>Correo para recuperación de contraseña</p>" + 
                "<a href='"+ dominio + "'>Click para recuperar</a>" +
                "<p>Este correo es valido por "+ vigencia + " minutos</p>"
            );
            mail_message.IsBodyHtml = true;

            SmtpClient smpt_client = new SmtpClient("smtp.gmail.com");
            smpt_client.EnableSsl = true;
            smpt_client.UseDefaultCredentials = false;
            smpt_client.Port = 587;
            smpt_client.Credentials = new System.Net.NetworkCredential(email_origen, contrasenia);

            smpt_client.Send(mail_message);

            smpt_client.Dispose();
        }
    }
}
