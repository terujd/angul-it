// Imports the necessary dependencies from Angular and the component to be tested
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

// Declares the component decorator
@Component({
  selector: 'app-captcha',// Defines the selector for the component
  templateUrl: './captcha.component.html',// Defines the HTML template for the component
  styleUrls: ['./captcha.component.scss']// Defines the CSS styles for the component
})
// Exports the component class
export class CaptchaComponent {
  @Input() currentStage!: number;// Defines the input property for the current stage
  @Output() success = new EventEmitter<{ stage: number; tries: number }>();// Defines the output property for the success event
  token: string|undefined;// Defines the token property
  numTries = 0;// Defines the number of tries property

  // Defines the constructor for the component
  constructor() {
    this.token = undefined;// Assigns the token property to undefined
  }

  // Defines the generateToken method
  public send(form: NgForm): void {
    if (form.invalid) {// Checks if the form is invalid
      for (const control of Object.keys(form.controls)) {// Iterates over the form controls
        form.controls[control].markAsTouched();// Marks the control as touched
      }
      return ;// Returns from the method
    }

    this.success.emit({ stage: this.currentStage, tries: this.numTries });// Emits the success event
    console.debug(`Token [${this.token}] generated`);// Logs the token to the console
    form.reset();// Resets the form
  }
}
