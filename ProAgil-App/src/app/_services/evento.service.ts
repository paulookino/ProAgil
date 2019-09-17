import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
    baseURL = 'http://localhost:500/api/evento'


constructor(private http: HttpClient) { }

getEvento(){
return this.http.get(this.baseURL);
}

}
