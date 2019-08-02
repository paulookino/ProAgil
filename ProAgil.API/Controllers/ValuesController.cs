using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.API.Data;
using ProAgil.API.Models;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }


        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try{

                var result = await  _context.Evento.ToListAsync();
                   return  Ok(result);
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            try{

                var result = await _context.Evento.FirstOrDefaultAsync(c => c.EventoId == id);


                return Ok(result);

            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");

            }
           
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
