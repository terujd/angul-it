import { Component } from '@angular/core'; // Import necessary modules from Angular
import { Router } from '@angular/router'; // Import the Router module
import { StageService } from '../service/service.component'; // Import the StageService

@Component({// Component decorator
  selector: 'app-result',// Selector
  templateUrl: './result.component.html',// Template URL
  styleUrls: ['./result.component.scss']// Style URLs
})

export class ResultComponent {// Component class
  totalStagesCompleted: number;// Public property to hold the total number of stages completed
  totalStages: number; // Public property to hold the total number of stages

  // Constructor to inject the StageService and Router
  constructor(private stageService: StageService, private router: Router) {
    this.totalStagesCompleted = this.stageService.getHighestStageCompleted();// Assign the value from the service
    this.totalStages = this.stageService.getTotalStages(); // Assign the value from the service
  }

  // Method to navigate back to the home page or the first stage
  goToHome(): void {
    this.stageService.clearStages(); // This clears the current stage and the highest stage completed
    this.stageService.setCurrentStage(1);// This resets the current stage to 1
    this.router.navigate(['/']); // This navigates back to the route path ''
  }
}
