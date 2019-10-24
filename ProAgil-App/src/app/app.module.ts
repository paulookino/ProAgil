import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventoService } from './_services/evento.service';
import { EventosComponent } from './eventos/eventos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { TituloComponent } from './_shared/titulo/titulo.component';

@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      DashboardComponent,
      ContatosComponent,
      PalestrantesComponent,
      TituloComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         preventDuplicates: true
      })
   ],
   providers: [
      EventoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
