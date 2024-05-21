using AdministraciónDeUsuarios.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdministraciónDeUsuarios.Controllers
{
    [EnableCors("ReglasCors")]

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //Declara un objecto dbcontext vamos a poder utilizar los metodos crud para nuestros modelos (Requerimiento)
        public readonly pruebaContext _dbcontext;
        //creo el constructo que recibe el contexto y asigno el valor _context a mi variable _dbcontext
        public UserController(pruebaContext _context)
        {
            _dbcontext = _context;
        }


        //METODO GET mostrar todos los datos de la tabla usuarios y categoria ya que estan relacionado atravez de llaves foraneas
        [HttpGet]
        [Route("ListaUsuarios")]
        public IActionResult Lista()
        {
            //CREO UN OBJECTO DE liSTA<PRODUCTO> EL CUAL VA HACER UNA NUEVA LISTA DE usuarios
            List<User> lista = new List<User>();
            //CREO EL TRYCATCH PARA CAPTURAR ERRORES
            try
            {
                //llamo a mi lista y utilzo _dbContext_NombreModelo[usuarios]
                lista = _dbcontext.Users.Include(c => c.oCargo).Include(d => d.oDepartamento).ToList();
                //DEVUELVE LA LISTA//se crea un json que contiene un mensaje ok y la respuesta sera lista
                // return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }


        //METODOPOST GUARDAR requerimiento en la tabla
        [HttpPost]
        [Route("GuardarUsuario")]
        public IActionResult Guardar([FromBody] User objeto)
        {

            //Utilizo el capturador de errores tryCatch
            try
            {
                //agrego mi objeto a dbcontext.requerimiento que es la tabla requerimiento
                //utilizo el metodo agregar y agrega mi objeto
                //estoy agregando mi objeto dentro de modelo producto
                _dbcontext.Users.Add(objeto);
                //hace un llamado a _dbcontext y utiliza el metodo guardar y guarda.
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }
        }



        //Metodo Editar requerimiento por id
        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] User objeto)
        {
            // Validamos que el usuario que queremos editar corresponda a un usuario existente en la base de datos
            User usuario = _dbcontext.Users.Find(objeto.Id);
            if (usuario == null)
            {
                return BadRequest("Usuario no encontrado");
            }
            try
            {
                usuario.Usuario = objeto.Usuario ?? usuario.Usuario;
                usuario.PrimerNombre = objeto.PrimerNombre ?? usuario.PrimerNombre;
                usuario.SegundoNombre = objeto.SegundoNombre ?? usuario.SegundoNombre;
                usuario.PrimerApellido = objeto.PrimerApellido ?? usuario.PrimerApellido;
                usuario.SegundoApellido = objeto.SegundoApellido ?? usuario.SegundoApellido;
                usuario.IdDepartamento = objeto.IdDepartamento ?? usuario.IdDepartamento;
                usuario.IdCargo = objeto.IdCargo ?? usuario.IdCargo;

                _dbcontext.Users.Update(usuario);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Usuario actualizado" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }



        //metodo para eliminar requerimiento por id
        [HttpDelete]
        [Route("Eliminar/{Id:int}")]
        public IActionResult Eliminar(int Id)
        {

            User usuario = _dbcontext.Users.Find(Id);

            if (usuario == null)
            {
                return BadRequest("Producto no encontrado");

            }

            try
            {

                _dbcontext.Users.Remove(usuario);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok Eliminado" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }


        }
    }
}


