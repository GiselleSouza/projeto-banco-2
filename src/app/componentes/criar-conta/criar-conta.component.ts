import { SalvarClienteService } from './../../services/salvar-cliente.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: SalvarClienteService,
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
    //isso só acontece em casos de sucesso
    this.alertaDadosSalvos();
    this.router.navigateByUrl('componentes/login');

    //para erros devemos adicionar um alertaDadosNaoSalvos
    const cliente: CriarConta = {nome: this.form.controls["nome"].value, email: this.form.controls["email"].value, senha: this.form.controls["senha"].value};
    this.service.salvarCliente(cliente).subscribe({
      next(){ },
      error(erro){
        console.log(erro);
      }
    });
  }

  alertaDadosSalvos(){
    this.snackBar.open("Conta criada com sucesso.", undefined, {
      duration: 2000,
      panelClass: ['snackbar-tema'],
    });
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
