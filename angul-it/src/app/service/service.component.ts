import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import the HttpClient and HttpErrorResponse modules from Angular
import { Injectable } from '@angular/core'; // Import the Injectable module from Angular
import { Observable, throwError } from 'rxjs'; // Import the Observable and throwError modules from rxjs
import { catchError } from 'rxjs/operators'; // Import the catchError module from rxjs/operators


@Injectable({// Decorator that marks a class as available to be provided and injected as a dependency
  providedIn: 'root'// Declare that the service should be provided in the root injector
})
export class StageService {// Export the StageService class
  private readonly totalStages = 4;// Private property to hold the total number of stages
  private currentStageKey = 'currentStage';// Private currentStageKey property to hold the current stage key
  private highestStageCompletedKey = 'highestStageCompleted';// Private highestStageCompletedKey property to hold the highest stage completed key

  // Public properties to hold the current stage and the highest stage completed
  currentStage: number = 1;
  highestStageCompleted: number = 0;

  constructor(private http: HttpClient) {}// Constructor to inject the HttpClient

  // Method to test if localStorage is available
  testLocalStorage(): void {
    try {
      localStorage.setItem('test', 'test');// Set a test value
      const testValue = localStorage.getItem('test');// Retrieve the test value
      console.log('LocalStorage test value:', testValue);// Log the test value to the console
      localStorage.removeItem('test');// Remove the test value
      if (testValue !== 'test') {// If the test value is not 'test'
        console.error('LocalStorage is not working as expected!');// Log an error to the console
      }
    } catch (error) {// Catch any errors
      console.error('LocalStorage is not available:', error);// Log an error to the console
    }
  }

  // Method to get your data
  getYourData(): Observable<any> {
    return this.http.get('http://localhost:4200/').pipe(// Make a GET request to the server
    catchError(this.handleError)// Handle any errors
    );
  }

  // Method to handle errors from the server
  private  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {// If the error is an instance of ErrorEvent
      console.error('An error occurred:', error.error.message); // A client-side or network error occurred. Handle it accordingly.
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`); // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong.
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));// Return an observable with a user-facing error message.
  }

  // Method to initialize the session
  initializeSession(): void {
    const isNewSession = !sessionStorage.getItem('isContinueSession');// Check if the session is new
    if (isNewSession) {// If the session is new
      this.clearStages();// Clear the stages
    } else {
      // Use the methods to set the values
      this.currentStage = this.getCurrentStage();// Retrieve the current stage
      this.highestStageCompleted = this.getHighestStageCompleted();// Retrieve the highest stage completed
    }
    sessionStorage.setItem('isContinueSession', 'true');// Set the session flag
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

  // This method sets the highest stage completed
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
