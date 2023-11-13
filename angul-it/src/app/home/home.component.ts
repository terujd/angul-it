import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from '../service/service.component';

//Component decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// this component is used to display the home page
export class HomeComponent implements OnInit {
  // this variable is used to keep track of the total number of stages
  readonly totalStages = 4;

  // this variable is used to keep track of the current stage
  currentStage = 1;
  // this variable is used to keep track of the highest stage completed
  highestStageCompleted = 0;
  
  // inject the router service
  constructor(private router: Router,
    private stageService: StageService
    ) {}

  // this method is called when the component is initialized
  ngOnInit() {
    this.stageService.initializeSession();
    // update the current stage and the highest stage completed from the service
    this.updateStagesFromService();
    // logs if the current stage and the highest stage completed
    console.log(`OnInit: Current Stage: ${this.currentStage}, Highest Stage Completed: ${this.highestStageCompleted}`);
  }

  // this method is called when the component is destroyed
  private updateStagesFromService(): void {
    // update the current stage and the highest stage completed from the service
    this.currentStage = this.stageService.getCurrentStage();
    // Retrieve the current stage and the highest stage completed from the service
    this.highestStageCompleted = this.stageService.getHighestStageCompleted();
  }

  // this method is called when the user successfully completes the captcha
  onCaptchaSuccess(eventData: { stage: number, tries: number }): void {
    console.log(`Captcha Success with tries at stage ${eventData.stage}`);
    console.log('Captcha Success: Incrementing stage');
    if (this.currentStage < this.totalStages) {
      // If not on the last stage, increment the stage
      this.highestStageCompleted = Math.max(this.highestStageCompleted, this.currentStage);
      this.currentStage++;
      this.stageService.setCurrentStage(this.currentStage);
      this.stageService.setHighestStageCompleted(this.highestStageCompleted);
    } else if (this.currentStage === this.totalStages) {
      // If on the last stage, call the success handler
      this.onQuestionSuccess(eventData);
    }
  }

  onMathSuccess(eventData: { stage: number, tries: number }): void{
    console.log(`Math Success with tries at stage ${eventData.stage}`);
    console.log('Math Success: Incrementing stage');
    if (this.currentStage < this.totalStages) {
      // If not on the last stage, increment the stage
      this.highestStageCompleted = Math.max(this.highestStageCompleted, this.currentStage);
      this.currentStage++;
      this.stageService.setCurrentStage(this.currentStage);
      this.stageService.setHighestStageCompleted(this.highestStageCompleted);
    } else if (this.currentStage === this.totalStages) {
      // If on the last stage, call the success handler
      this.onQuestionSuccess(eventData);
    }
  }

  // this method is called when the user successfully completes the math question
  onQuestionSuccess(eventData: { stage: number, tries: number }): void {
      console.log(`Question Success with tries at stage ${eventData.stage}`);
    // Since this is the last stage, we can navigate to the success page
    this.highestStageCompleted = this.totalStages;
    this.stageService.setHighestStageCompleted(this.highestStageCompleted);
    this.router.navigate(['/result']); // Assuming '/result' is the path to the result page
  }


  // methods to go to the next stage or previous stage
  goToNextStage(): void {
    // check if the current stage is less than 4
    if (this.currentStage <= this.highestStageCompleted && this.currentStage < this.totalStages) {
      this.currentStage++;
    }
  }

  // use this method to go back to the previous stage
  goToPreviousStage(): void {
    // check if the current stage is greater than 1
    if (this.currentStage > 1) {
      this.currentStage--;
    }
  }

  // use this method to directly go to a specific stage
  setStage(stage: number): void {
    // check if the stage is between 1 and 4
    if (stage > 1 && stage <= this.highestStageCompleted + 1) {
      this.currentStage = stage;
    }
  }
}
