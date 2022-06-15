import { MatSnackBar } from '@angular/material/snack-bar';
import { CriarConta } from './../../models/criar-conta.model';
import { SalvarClienteService } from './../../services/salvar-cliente/salvar-cliente.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  clientes: CriarConta[];

  constructor(
    private formBuilder: FormBuilder,
    private salvarCliente: SalvarClienteService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });

    this.salvarCliente.lerClientes().subscribe({
      next: (clientes: CriarConta[]) => {
        this.clientes = clientes;
        console.table(clientes)
      },
      error: () => {
        this.alertaSnackBar("sistemaIndisponivel");
      }
    });
  }

  realizarLogin(){
    let cliente = this.validarUsuario();
    if (!cliente){
      this.alertaSnackBar("usuarioInexistente");
    } else{
      this.validarSenha(cliente);
    }
  }

  validarUsuario(): any{
    for (let cliente of this.clientes) {
      if(cliente.email === this.form.controls["email"].value) return cliente;
    }
    return null;
  }

  validarSenha(cliente: CriarConta){
    if(cliente.senha === this.form.controls["senha"].value){
      this.salvarCliente.salvarClienteLogin(cliente);
      this.alertaSnackBar("loginSucesso");
    } else {
      this.alertaSnackBar("usuarioInexistente");
    }
  }

  alertaSnackBar(tipoAlerta: String){
    switch (tipoAlerta) {
      case "usuarioInexistente":
        this.snackBar.open("E-mail ou senha incorreto(s).", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema'],
        });
        break;
      case "loginSucesso":
        this.route.navigate(['../../componentes/painel']);
        this.snackBar.open("Login realizado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema'],
        });
        break;
      case "sistemaIndisponivel":
        this.snackBar.open("Sistema temporariamente indisponível.", undefined, {
          panelClass: ['snackbar-tema'],
        });
        break;
    }
  }
}
