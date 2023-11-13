import { HttpClientModule } from '@angular/common/http'; // Import necessary modules from Angular
import { NgModule } from '@angular/core'; // Import necessary modules from Angular
import { FormsModule } from '@angular/forms'; // Import necessary modules from Angular
import { BrowserModule } from '@angular/platform-browser'; // Import necessary modules from Angular
// Import the Recaptcha modules
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment'; // Import the environment
import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule
import { AppComponent } from './app.component'; // Import the AppComponent
import { CaptchaComponent } from './captcha/captcha.component'; // Import the CaptchaComponent
import { HomeComponent } from './home/home.component'; // Import the HomeComponent
import { MathComponent } from './math/math.component'; // Import the MathComponent
import { QuestionComponent } from './question/question.component'; // Import the QuestionComponent
import { ResultComponent } from './result/result.component'; // Import the ResultComponent


// NgModule decorator to declare the module and import the necessary modules and components
@NgModule({
  declarations: [
    AppComponent,
    CaptchaComponent,
    HomeComponent,
    MathComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptcha.siteKey,
    } as RecaptchaSettings,// Provide the site key for the Recaptcha
  }],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }// Export the AppModule



