import { SalvarClienteService } from './../../services/salvar-cliente.service';
import { CriarConta } from './../../models/criar-conta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private service: SalvarClienteService
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
    this.alertaDadosSalvos();
    const cliente: CriarConta = {nome: this.form.controls["nome"].value, email: this.form.controls["email"].value, senha: this.form.controls["senha"].value};
    this.service.salvarCliente(cliente).subscribe(
      resultado => {
        console.log(resultado);
      },
      (error) => console.log(error)
    )
  }

  alertaDadosSalvos(){
    this.snackBar.open("Conta criada com sucesso.", undefined, {
      duration: 2000,
      panelClass: ['snackbar-tema'],
    });
  }

  validaSenhas() {
    if (this.form.controls["senha"].value != this.form.controls["confirmacaoSenha"].value) {
      // this.senha.setErrors({camposDivergentes: true});
      this.form.controls["confirmacaoSenha"].setErrors({camposDivergentes: true});
      return 'Os campos estão distintos';
    } else{
      this.form.controls["senha"].setErrors(null);
      this.form.controls["confirmacaoSenha"].setErrors(null);

      return null;
    }
  }

  getErrorMessage() {
    if ((this.form.controls["email"].hasError('required')) || (this.form.controls["nome"].hasError('required'))) {
      return 'Este campo é obrigatório';
    }

    return this.form.controls["email"].hasError('email') ? 'E-mail inválido' : '';
  }
}
