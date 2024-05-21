using AdministraciónDeUsuarios.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AdministraciónDeUsuarios.Controllers
{

    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class CargoController : ControllerBase
    {
        public readonly pruebaContext _dbcontext;
        public CargoController(pruebaContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            List<Cargo> lista = new List<Cargo>();
            try
            {
                lista = _dbcontext.Cargos.ToList();
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }
    }
}
 


