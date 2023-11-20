import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Imports the necessary dependencies from Angular

// Declares the component decorator
@Component({
  selector: 'app-math',// Defines the selector for the component
  templateUrl: './math.component.html',// Defines the HTML template for the component
  styleUrls: ['./math.component.scss'],// Defines the CSS styles for the component
  styles: []// Defines the styles for the component
})

// Exports the component class
export class MathComponent implements OnInit {
  @Input() operation!: 'addition' | 'subtraction';// Defines the input property for the operation
  @Input() currentStage!: number;// Defines the input property for the current stage
  @Output() success = new EventEmitter<{ stage: number, tries: number }>();// Defines the output property for the success event

// Defines the properties for the components
  question!: string;
  correctAnswer!: number;
  userAnswer!: number;
  isCorrect: boolean = false;
  answered: boolean = false;
  numTries: number = 0;
  errorMessage: string = '';


  // This method is called when the component is initialized
  ngOnInit(): void {
    // Generate the first random question when the component is initialized
    this.generateQuestion();
  }

  // This method generates a random math question
  generateQuestion(): void {
    // Generate two random numbers between 0 and 10 for the math question
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);

    // Generate a random operation
    if (this.operation === 'addition') {// If the operation is addition
      this.question = `What is ${a} + ${b}`;// This line generates a random math question
      this.correctAnswer = a + b;// This line calculates the correct answer
    } else if (this.operation === 'subtraction') {// If the operation is subtraction
      this.question = `What is ${a} - ${b}`;// This line generates a random math question
      this.correctAnswer = a - b;// This line calculates the correct answer
    }
    this.answered = false;// This line resets the answered flag
  }

  // This method checks the user's answer
  checkAnswer(): void {
    this.numTries++; // Increment the number of tries
  
    if (this.userAnswer === this.correctAnswer) {
      this.isCorrect = true;
      this.success.emit({ stage: this.currentStage, tries: this.numTries });
      this.numTries = 0; // Reset the number of tries
      this.errorMessage = ''; // Clear any error message
    } else {
      this.isCorrect = false;
      this.answered = true;
      this.errorMessage = 'Wrong answer, please try again.'; // Set the error message
      this.generateQuestion(); // Generate a new question if the answer is incorrect
    }
  }
}
  // checkAnswer(): void {
  //   if (this.userAnswer === this.correctAnswer) {// This line checks if the user's answer is correct
  //     this.isCorrect = true;// This line sets the isCorrect flag to true
  //     this.success.emit({ stage: this.currentStage, tries: this.numTries });// This line emits the success event
  //   } else {
  //     this.isCorrect = false;// This line sets the isCorrect flag to false
  //     this.answered = true;// This line sets the answered flag to true
  //   }
  // }