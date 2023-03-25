namespace Modelos
{
    public class ModeloUsuario : ModeloToken
    {
        public string id { get; set; }
        public string nombre { get; set; }
        public string usuario { get; set; }
        public string contasenia { get; set; }
        public string correo { get; set; }
        public string nacimiento { get; set; }
        public string agregado_el { get; set; }
        public string modificado_el { get; set; }
        public string agregado_por { get; set; }
        public string modificado_por { get; set; }
        public int esado { get; set; }
    }
}
