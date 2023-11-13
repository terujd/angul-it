import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { questions } from './questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],

})
export class QuestionComponent implements OnInit {
  // @Output() success = new EventEmitter<void>();
  @Input() currentStage!: number;
  // @Output() success = new EventEmitter<{ stage: number }>();
  @Output() success = new EventEmitter<{ stage: number, tries: number }>();
  // @Output() successWithTries = new EventEmitter<number>();

  question!: { text: string; answer: string };
  userAnswer!: string;
  isCorrect: boolean = false;
  wrongAnswer: boolean = false;
  numTries: number = 0;
  // answered: boolean = false;

  ngOnInit(): void {
    this.generateQuestion();
  }

  generateQuestion(): void {
    const randomIndex = Math.floor(Math.random() * questions.length);
    this.question = questions[randomIndex];
    this.isCorrect = false;
    this.userAnswer = '';
    this.wrongAnswer = false;
  }


  checkAnswer(): void {
    this.numTries++;

    if (this.userAnswer === this.question.answer) {
      this.isCorrect = true;
      // this.success.emit({ stage: this.currentStage });
      this.success.emit({ stage: this.currentStage, tries: this.numTries });
      this.numTries = 0;
      // Reset the number of tries
      // this.numTries = 0;
    } else {
      this.isCorrect = false;
      this.wrongAnswer = true;
    }
  }
}
      // const stageNumber = parseInt(this.question.text.split(' ')[1]);
      // this.success.emit(); // This line emits the success event, emits means "sends out"
      // this.success.emit(this.numTries); // This line emits the success event, emits means "sends out"
      // this.success.emit({ stage: stageNumber, tries: this.numTries });