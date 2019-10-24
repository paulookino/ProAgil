import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import {  BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { TemplateParseError } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';


defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
  
  eventosFiltrados:  any = [];
  eventos: any = [];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  bodyDeletarEvento = '';
  modoSalvar = 'post';
  
  _filtroLista= '';

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) { 
        this.localeService.use('pt-br');
    }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

editarEvento(evento: Evento, template: any){
  this.modoSalvar = 'put';
  this.openModal(template);
  this.evento = evento;
  this.registerForm.patchValue(evento);
}

novoEvento(template: any){
  this.modoSalvar = 'post';
  this.openModal(template);
}


excluirEvento(evento: Evento, template: any){
  this.openModal(template);
  this.evento = evento;
  this.bodyDeletarEvento = `Tem certeza que deseja excluir o evento: ${evento.tema}, Código ${evento.id}`;
}

confirmDelete(template: any){
  this.eventoService.deleteEvento(this.evento.id).subscribe(
      () =>{
      template.hide();
      this.getEventos();
      this.toastr.success("Evento excluído com sucesso!");
      }, error => {
        this.toastr.error("Ocorreu um erro ao excluir o evento!");
        console.log(error);
        }
  );
}

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }


  ngOnInit() {
    this.validation();
    this.getEventos();
  }

filtrarEventos(filtrarPor: string): Evento[] {
filtrarPor = filtrarPor.toLocaleLowerCase();
return this.eventos.filter(
evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
);
}

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

validation(){
  this.registerForm = this.fb.group({

      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemUrl: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

  });

}

  salvarAlteracao(template: any){
      if(this.registerForm.valid)
      {
        if(this.modoSalvar === 'post'){
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
              (novoEvento: Evento) =>{
                console.log(novoEvento);
                template.hide();
                this.getEventos();
                this.toastr.success("Evento cadastrado com sucesso!");
              }, error => {
                this.toastr.error(`Erro ao cadastrar evento: ${error}`);
                console.log(error);
              }
              
          );
            }
            else{

              this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
              this.eventoService.putEvento(this.evento).subscribe(
                  (novoEvento: Evento) =>{
                    template.hide();
                    this.getEventos();
                    this.toastr.success("Evento editado com sucesso!");
                  }, error => {
                    this.toastr.error(`Erro ao editar evento: ${error}`);
                    console.log(error);
                  }
                  
              ); 
              
            }
      }

  }

  getEventos(){

    this.eventoService.getAllEventos().subscribe(

    (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
      console.log(_eventos);
    },
    error => {
      console.log(error);
    }

    );
  }

}
