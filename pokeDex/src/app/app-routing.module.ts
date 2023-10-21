import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeTableComponent } from './components/poke-table/poke-table.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path:'home',component:PokeTableComponent},
  {path:'',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
