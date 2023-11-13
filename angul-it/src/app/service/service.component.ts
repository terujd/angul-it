import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StageService {
  private readonly totalStages = 4;
  private currentStageKey = 'currentStage';
  private highestStageCompletedKey = 'highestStageCompleted';

  currentStage: number = 1;
  highestStageCompleted: number = 0;

  constructor(private http: HttpClient) {}

  testLocalStorage(): void {
    try {
      localStorage.setItem('test', 'test');
      const testValue = localStorage.getItem('test');
      console.log('LocalStorage test value:', testValue);
      localStorage.removeItem('test');
      if (testValue !== 'test') {
        console.error('LocalStorage is not working as expected!');
      }
    } catch (error) {
      console.error('LocalStorage is not available:', error);
    }
  }

  getYourData(): Observable<any> {
    return this.http.get('http://localhost:4200/').pipe(
    catchError(this.handleError)
    );
  }

  private  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message); // A client-side or network error occurred. Handle it accordingly.
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`); // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong.
    }
    return throwError('Something bad happened; please try again later.');
  }

  initializeSession(): void {
    const isNewSession = !sessionStorage.getItem('isContinueSession');
    if (isNewSession) {
      this.clearStages();
    } else {
      // Use the methods to set the values
      this.currentStage = this.getCurrentStage();
      this.highestStageCompleted = this.getHighestStageCompleted();
    }
    sessionStorage.setItem('isContinueSession', 'true');
  }


  // This method retrieves the total number of stages
  getTotalStages(): number {
    // Return the total number of stages
    return this.totalStages;
  }

  // This method retrieves the current stage
  getCurrentStage(): number {
    const stage = localStorage.getItem(this.currentStageKey);
    console.log('Getting current stage from localStorage: ${stage}');
    return stage ? parseInt(stage, 10) : 1;  // If nothing is saved, the current stage is 1
    // Retrieve and parse the current stage from localStorage
    // return Number(localStorage.getItem(this.currentStageKey)) || 1;
  }

  // This method sets the current stage
  setCurrentStage(stage: number): void {
    // Save the current stage to localStorage
    localStorage.setItem(this.currentStageKey, stage.toString());
  }

  // This method retrieves the highest stage completed
  getHighestStageCompleted(): number {
    // Retrieve and parse the highest completed stage from localStorage
    const stage = localStorage.getItem(this.highestStageCompletedKey);
    return stage ? parseInt(stage, 10) : 0;  // If nothing is saved, no stages are completed
  }

  setHighestStageCompleted(stage: number): void {
    // Save the highest completed stage to localStorage
    localStorage.setItem(this.highestStageCompletedKey, stage.toString());
  }

  // This method clears the current stage and the highest stage completed
  clearStages(): void {
    // Remove the current stage and the highest stage completed from localStorage
    localStorage.removeItem(this.currentStageKey);
    localStorage.removeItem(this.highestStageCompletedKey);
  }
}
