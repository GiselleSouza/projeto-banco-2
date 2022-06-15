import { SalvarClienteService } from './../../services/salvar-cliente/salvar-cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  nomeCliente: String;
  saldo: number = 1000;

  showSaldo: boolean = false;

  constructor(
    private salvarCliente: SalvarClienteService
  ) { }

  ngOnInit(): void {
    this.nomeCliente = this.salvarCliente.obterClienteLogin().nome;
  }

}
