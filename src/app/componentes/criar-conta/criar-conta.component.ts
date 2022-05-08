import { GeralService } from './../../services/geral/geral.service';
import { SalvarClienteService } from './../../services/salvar-cliente/salvar-cliente.service';
import { CriarConta } from './../../models/criar-conta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  form: FormGroup;
  hideSenha = true;
  hideConfirmacaoSenha = true;
  loading = this.geralService.loading;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private salvarClienteService: SalvarClienteService,
    private geralService: GeralService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmacaoSenha: new FormControl('', [Validators.required]),
    });
  }

  salvarDadosCliente() {
    let tipoExecucao: String;
    const cliente: CriarConta = {nome: this.form.controls["nome"].value, email: this.form.controls["email"].value, senha: this.form.controls["senha"].value};
    this.geralService.show();

    this.salvarClienteService.salvarCliente(cliente)
      .subscribe({
        next: () => {
          this.geralService.hide();
          tipoExecucao = "sucesso";
          this.alertaDados(tipoExecucao);
          this.router.navigateByUrl('componentes/login');
        },
        error: () => {
          this.geralService.hide();
          tipoExecucao = "falha";
          this.alertaDados(tipoExecucao);
        }
      }
    );
  }

  alertaDados(tipoExecucao: String){
    switch (tipoExecucao) {
      case "sucesso":
        this.snackBar.open("Conta criada com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema'],
        });
        break;
      case "falha":
        this.snackBar.open("Serviço indisponível no momento, tente novamente mais tarde.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema'],
        });
    }
  }

  validaSenhas() {
    if (this.form.controls["senha"].value != this.form.controls["confirmacaoSenha"].value) this.form.controls["confirmacaoSenha"].setErrors({camposDivergentes: true});

      return this.form.controls["confirmacaoSenha"].hasError('camposDivergentes') ? 'As senhas devem ser iguais' : '';
  }

  validaEmail() {
    if (this.form.controls["email"].hasError('required')) {
      return 'Este campo é obrigatório';
    }

    return this.form.controls["email"].hasError('email') ? 'E-mail inválido' : '';
  }
}
