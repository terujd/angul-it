import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  @Input() currentStage!: number;
  @Output() success = new EventEmitter<{ stage: number; tries: number }>();
  token: string|undefined;
  numTries = 0;

  constructor() {
    this.token = undefined;
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return ;
    }

    this.success.emit({ stage: this.currentStage, tries: this.numTries });
    console.debug(`Token [${this.token}] generated`);
    form.reset();
  }
}
