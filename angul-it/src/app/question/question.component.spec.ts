import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing modules and component dependencies from Angular

import { QuestionComponent } from './question.component'; // Import the component to be tested

// Start of the test suite for the component
describe('QuestionComponent', () => {
  let component: QuestionComponent;// Declare variables for the component and fixture
  let fixture: ComponentFixture<QuestionComponent>;// Before each test, configure the testing module

  // Configure the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({// Configure the testing module
      declarations: [QuestionComponent]// Declare the component to be tested
    });
    fixture = TestBed.createComponent(QuestionComponent);// Create a fixture for the component
    component = fixture.componentInstance;// Assign the component to the component variable
    fixture.detectChanges();// Detect changes to the component
  });

  it('should create', () => {// Test that the component is created
    expect(component).toBeTruthy();// Expect the component to be truthy
  });
});
