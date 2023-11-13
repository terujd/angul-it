import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss'],
  styles: []
})
export class MathComponent implements OnInit {
  @Input() operation!: 'addition' | 'subtraction';
  @Input() currentStage!: number;
  // @Output() success = new EventEmitter<{ stage: number }>();
  @Output() success = new EventEmitter<{ stage: number, tries: number }>();


  question!: string;
  correctAnswer!: number;
  userAnswer!: number;
  isCorrect: boolean = false;
  answered: boolean = false;
  numTries: number = 0;

  // This method is called when the component is initialized
  ngOnInit(): void {
    // Generate the first question when the component is initialized
    this.generateQuestion();
  }

  // This method generates a random math question
  generateQuestion(): void {
    // Generate two random numbers between 0 and 10
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);

    // Generate a random operation
    if (this.operation === 'addition') {
      this.question = `What is ${a} + ${b}`;// This line generates a random math question
      this.correctAnswer = a + b;// This line calculates the correct answer
    } else if (this.operation === 'subtraction') {
      this.question = `What is ${a} - ${b}`;// This line generates a random math question
      this.correctAnswer = a - b;// This line calculates the correct answer
    }
    this.answered = false;// This line resets the answered flag
  }

  // This method checks the user's answer
  checkAnswer(): void {
    if (this.userAnswer === this.correctAnswer) {// This line checks if the user's answer is correct
      this.isCorrect = true;// This line sets the isCorrect flag to true
      this.success.emit({ stage: this.currentStage, tries: this.numTries });
      // this.numTries = 0;
      // this.success.emit({ stage: this.currentStage });// This line emits the success event, emits means "sends out"
    } else {
      this.isCorrect = false;// This line sets the isCorrect flag to false
      this.answered = true;// This line sets the answered flag to true
    }
  }
}




// import { Component, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-math',
//   templateUrl: './math.component.html',
//   styleUrls: ['./math.component.scss']
// })
// export class MathComponent {
//   @Output() success = new EventEmitter<void>();

// //   problem: string = '';
// // solution: number = 0;
//   problem!: string;
//   solution!: number;
//   userAnswer = '';

//   constructor() {
//     this.generateProblem();
//   }

//   private generateProblem() {
//     const a = Math.floor(Math.random() * 10) + 1;
//     const b = Math.floor(Math.random() * 10) + 1;
//     this.problem = `${a} + ${b}`;
//     this.solution = a + b;
//   }

//   checkAnswer() {
//     if (parseInt(this.userAnswer) === this.solution) {
//       this.success.emit();
//     } else {
//       this.generateProblem();
//     }
//     this.userAnswer = '';
//   }
// }
