

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.API.Dtos;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        private readonly IMapper _mapper;

        public EventoController(IProAgilRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try{

                var eventos = await  _repo.GetAllEventoAsync(true);

                var results = _mapper.Map<EventoDto[]>(eventos);

                   return  Ok(results);
            }
            catch(Exception ex){

                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");

            }
           
        }


        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {

            try{

                var evento = await  _repo.GetAllEventoAsyncById(EventoId ,true);

                var result = _mapper.Map<EventoDto>(evento);


                return  Ok(result);
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
        }

        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {

            try{

                var eventos = await  _repo.GetAllEventoAsyncByTema(tema, true);

                var result = _mapper.Map<EventoDto[]>(eventos);

                   return  Ok(result);
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {

            try{

                var evento = _mapper.Map<Evento>(model);

                _repo.Add(evento);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
           return BadRequest();
        }

        
        [HttpPut("{EventoId}")]
        public async Task<IActionResult> Put(int EventoId, Evento model)
        {

            try{

                var evento = await _repo.GetAllEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();


                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
           return BadRequest();
        }

        [HttpDelete("{EventoId}")]
        public async Task<IActionResult> Delete(int EventoId)
        {

            try{

                var evento = await _repo.GetAllEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();


                _repo.Delete(evento);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch(Exception){

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");

            }
           
           return BadRequest();
        }
    }
}