import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Imports the necessary dependencies from Angular
import { questions } from './questions'; // Imports the questions from the questions file

// Declares the component decorator
@Component({
  selector: 'app-question',// Defines the selector for the component
  templateUrl: './question.component.html',// Defines the HTML template for the component
  styleUrls: ['./question.component.scss'],// Defines the CSS styles for the component
})

// Exports the component class
export class QuestionComponent implements OnInit {
  @Input() currentStage!: number;// Defines the input property for the current stage
  @Output() success = new EventEmitter<{ stage: number, tries: number }>();// Defines the output property for the success event

  // Defines the properties for the components
  question!: { text: string; answer: string };
  userAnswer!: string;
  isCorrect: boolean = false;
  wrongAnswer: boolean = false;
  numTries: number = 0;
  errorMessage: string = '';

  // This method is called when the component is initialized
  ngOnInit(): void {
    this.generateQuestion();// Generate the first random question when the component is initialized
  }

  // This method generates a random math question
  generateQuestion(): void {
    const randomIndex = Math.floor(Math.random() * questions.length);// Generate a random index for the question
    this.question = questions[randomIndex];// This line generates a random question
    this.isCorrect = false;// This line resets the isCorrect flag
    this.userAnswer = '';// This line resets the userAnswer flag
    this.wrongAnswer = false;// This line resets the wrongAnswer flag
  }

  // This method checks the user's answer
  checkAnswer(): void {
    this.numTries++; // Increment the number of tries

    if (this.userAnswer.toLowerCase() === this.question.answer.toLowerCase()) {
        this.isCorrect = true; // Set isCorrect to true if the answer is correct
        this.success.emit({ stage: this.currentStage, tries: this.numTries }); // Emit success event
        this.numTries = 0; // Reset the number of tries
        this.errorMessage = ''; // Clear any error message
    } else {
        this.isCorrect = false; // Set isCorrect to false if the answer is wrong
        this.wrongAnswer = true; // Set wrongAnswer to true
        this.errorMessage = 'Wrong answer, please try again.'; // Set the error message
        this.generateQuestion(); // Generate a new question since the answer was wrong
    }
  }
}
