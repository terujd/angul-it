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
    this.numTries++;// Increment the number of tries

    if (this.userAnswer.toLowerCase() === this.question.answer.toLowerCase()) {// This line checks if the user's answer is correct
      this.isCorrect = true;// This line sets the isCorrect flag to true
      this.success.emit({ stage: this.currentStage, tries: this.numTries });// This line emits the success event
      this.numTries = 0;// Reset the number of tries
    } else {
      this.isCorrect = false;// This line sets the isCorrect flag to false
      this.wrongAnswer = true;// This line sets the wrongAnswer flag to true
    }
  }
}