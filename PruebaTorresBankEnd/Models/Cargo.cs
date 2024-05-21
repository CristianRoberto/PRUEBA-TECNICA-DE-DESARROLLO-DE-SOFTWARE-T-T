using System;
using System.Collections.Generic;

namespace AdministraciónDeUsuarios.Models
{
    public partial class Cargo
    {
        public Cargo()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string? Codigo { get; set; }
        public string? Nombre { get; set; }
        public bool? Activo { get; set; }
        public int? IdUsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
