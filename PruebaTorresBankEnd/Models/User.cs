using System;
using System.Collections.Generic;

namespace AdministraciónDeUsuarios.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Usuario { get; set; } = null!;
        public string? PrimerNombre { get; set; }
        public string? SegundoNombre { get; set; }
        public string? PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }
        public int? IdDepartamento { get; set; }
        public int? IdCargo { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual Cargo? oCargo { get; set; }
        public virtual Departamento? oDepartamento { get; set; }
    }
}
