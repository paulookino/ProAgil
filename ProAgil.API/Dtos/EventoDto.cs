using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventoDto
    {
        
        public int Id { get; set; }

        [Required (ErrorMessage="Campo Obrigatório")]  
        [StringLength (100, MinimumLength=3, ErrorMessage="Prenncha entre e 100 Caractéres")]
        public string Local { get; set; }

        public string DataEvento { get; set; }


        [Required (ErrorMessage="O tema deve ser preenchido.")]
        public string Tema { get; set; }     

        [Range(2, 120000, ErrorMessage="Quantidade de pessoas entre 2 e 120000")]
        public int QtdPessoas { get; set; }

        public string ImagemUrl {get; set;}

        
        [Phone]
        public string Telefone { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }     

        public List<LoteDto> Lotes { get; set; }

        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<PalestranteDto> Palestrante { get; set; }
    }
}