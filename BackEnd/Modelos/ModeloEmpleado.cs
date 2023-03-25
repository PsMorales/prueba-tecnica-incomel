namespace Modelos
{
    public class ModeloEmpleado : ModeloToken
    {
        public string id { get; set; }
        public string nombre_completo { get; set; }
        public string dpi { get; set; }
        public int cantidad_hijos { get; set; }
        public double salario_base { get; set; }
        public double bono_decreto { get; set; }
        public string agregado_por { get; set; }
        public string modificado_por { get; set; }
        public string agregado_el { get; set; }
        public string modificado_el { get; set; }
        public int estado { get; set; }
    }
}
