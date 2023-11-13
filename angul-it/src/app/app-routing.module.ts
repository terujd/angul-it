import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { resultGuard } from './result/result.guard';


const routes: Routes = [

  { path: '', component : HomeComponent},
  { path: 'result', component : ResultComponent, canActivate: [resultGuard] },
  // { path: 'success', component : ResultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
