import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import the HttpClient and HttpErrorResponse modules from Angular
import { Injectable } from '@angular/core'; // Import the Injectable module from Angular
import * as CryptoJS from 'crypto-js'; // Import the CryptoJS module
import { Observable, throwError } from 'rxjs'; // Import the Observable and throwError modules from rxjs
import { catchError } from 'rxjs/operators'; // Import the catchError module from rxjs/operators


@Injectable({// Decorator that marks a class as available to be provided and injected as a dependency
  providedIn: 'root'// Declare that the service should be provided in the root injector
})
export class StageService {
  private readonly totalStages = 4;
  private currentStageKey = 'currentStage';
  private highestStageCompletedKey = 'highestStageCompleted';
  private encryptionKey = 'encryptionKey';

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

  private saveToLocalStorage(key: string, value: string): void {
    const encryptedData = CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
    localStorage.setItem(key, encryptedData);
  }

  private getFromLocalStorage(key: string): number {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey).toString(CryptoJS.enc.Utf8);
      return parseInt(decryptedData, 10);
    }
    return 0;
  }

  getYourData(): Observable<any> {
    return this.http.get('http://localhost:4200/').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  initializeSession(): void {
    const isNewSession = !sessionStorage.getItem('isContinueSession');
    if (isNewSession) {
      this.clearStages();
    } else {
      this.currentStage = this.getCurrentStage();
      this.highestStageCompleted = this.getHighestStageCompleted();
    }
    sessionStorage.setItem('isContinueSession', 'true');
  }

  getTotalStages(): number {
    return this.totalStages;
  }

  getCurrentStage(): number {
    return this.getFromLocalStorage(this.currentStageKey) || 1;
  }

  setCurrentStage(stage: number): void {
    this.saveToLocalStorage(this.currentStageKey, stage.toString());
  }

  getHighestStageCompleted(): number {
    return this.getFromLocalStorage(this.highestStageCompletedKey) || 0;
  }

  setHighestStageCompleted(stage: number): void {
    this.saveToLocalStorage(this.highestStageCompletedKey, stage.toString());
  }

  clearStages(): void {
    localStorage.removeItem(this.currentStageKey);
    localStorage.removeItem(this.highestStageCompletedKey);
  }
}

  // // This method retrieves the current stage
  // getCurrentStage(): number {
  //   const stage = localStorage.getItem(this.currentStageKey);
  //   console.log('Getting current stage from localStorage: ${stage}');
  //   return stage ? parseInt(stage, 10) : 1;  // If nothing is saved, the current stage is 1
  //   return this.getFromLocalStorage(this.currentStageKey) || 1;
  //   // Retrieve and parse the current stage from localStorage
  //   // return Number(localStorage.getItem(this.currentStageKey)) || 1;
  // }

  // // This method sets the current stage
  // setCurrentStage(stage: number): void {
  //   // Save the current stage to localStorage
  //   localStorage.setItem(this.currentStageKey, stage.toString());
  // }

  // // This method retrieves the highest stage completed
  // getHighestStageCompleted(): number {
  //   // Retrieve and parse the highest completed stage from localStorage
  //   const stage = localStorage.getItem(this.highestStageCompletedKey);
  //   return stage ? parseInt(stage, 10) : 0;  // If nothing is saved, no stages are completed
  // }

  // // This method sets the highest stage completed
  // setHighestStageCompleted(stage: number): void {
  //   // Save the highest completed stage to localStorage
  //   localStorage.setItem(this.highestStageCompletedKey, stage.toString());
  // }
