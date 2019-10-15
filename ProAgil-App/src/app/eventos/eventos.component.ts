import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import {  BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';


defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
  
  eventosFiltrados:  any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  
  _filtroLista= '';

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
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

  openModal(template: any){

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

  salvarAlteracao(){


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
