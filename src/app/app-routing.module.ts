import { PainelComponent } from './componentes/painel/painel.component';
import { LoginComponent } from './componentes/login/login.component';
import { CriarContaComponent } from './componentes/criar-conta/criar-conta.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'componentes/criar-conta', pathMatch: 'full'},
  {path: 'componentes/criar-conta', component: CriarContaComponent},
  {path: 'componentes/login', component: LoginComponent},
  {path: 'componentes/painel', component: PainelComponent},
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)
export class AppRoutingModule{

}
