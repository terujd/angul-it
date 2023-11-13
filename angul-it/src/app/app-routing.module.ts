import { NgModule } from '@angular/core'; // Import necessary modules from Angular
import { RouterModule, Routes } from '@angular/router'; // Import necessary modules from Angular
import { HomeComponent } from './home/home.component'; // Import the HomeComponent
import { ResultComponent } from './result/result.component'; // Import the ResultComponent
import { resultGuard } from './result/result.guard'; // Import the resultGuard

// Declare the routes
const routes: Routes = [

  { path: '', component : HomeComponent},// Declare the route for the home page
  { path: 'result', component : ResultComponent, canActivate: [resultGuard] },// Declare the route for the result page
  { path: '**', redirectTo: '' }// Declare the route for any other path
];

@NgModule({// NgModule decorator
  imports: [RouterModule.forRoot(routes)],// Import the routes
  exports: [RouterModule]// Export the routes
})
export class AppRoutingModule { }// Export the AppRoutingModule
