import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from '../service/service.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent {
  totalStagesCompleted: number;
  totalStages: number; // Public property to hold the total number of stages

  constructor(private stageService: StageService, private router: Router) {
    this.totalStagesCompleted = this.stageService.getHighestStageCompleted();
    this.totalStages = this.stageService.getTotalStages(); // Assign the value from the service
  }

// export class ResultComponent {
//   totalStagesCompleted: number; // This will hold the number of stages completed


//   constructor(
//     private router: Router,
//     private stageService: StageService
//     ) {
//       this.totalStagesCompleted = this.stageService.getHighestStageCompleted();
//     }


  // Method to navigate back to the home page or the first stage
  goToHome(): void {
    this.stageService.clearStages(); // This clears the current stage and the highest stage completed
    this.stageService.setCurrentStage(1);// This resets the current stage to 1
    this.router.navigate(['/']); // This navigates back to the route path ''
  }
}
