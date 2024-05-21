using AdministraciónDeUsuarios.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdministraciónDeUsuarios.Controllers
{
    [EnableCors("ReglasCors")]

    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {
        public readonly pruebaContext _dbcontext;
        public DepartamentoController(pruebaContext _context)
        {
            _dbcontext = _context;
        }


        [HttpGet]
        [Route("ListaDepartamento")]
        public IActionResult Lista()
        {
            List<Departamento> lista = new List<Departamento>();
            try
            {
                lista = _dbcontext.Departamentos.ToList();
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }
    }
}


