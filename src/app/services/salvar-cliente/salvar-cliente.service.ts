import { CriarConta } from './../../models/criar-conta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvarClienteService {

  private listaClientes: any[];
  private url = 'http://localhost:3000/clientes';

  constructor(private httpClient: HttpClient) {
    this.listaClientes = [];
  }

  get clientes(){
    return this.listaClientes;
  }

  salvarCliente(cliente: CriarConta): Observable<CriarConta>{
    return this.httpClient.post<CriarConta>(this.url, cliente);
  }

  lerClientes(): Observable<CriarConta[]>{
    return this.httpClient.get<CriarConta[]>(this.url);
  }
}
