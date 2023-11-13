import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing modules and component dependencies from Angular

import { ResultComponent } from './result.component'; // Import the component to be tested

// Start of the test suite for the component
describe('ResultComponent', () => {
  let component: ResultComponent;// Declare variables for the component and fixture
  let fixture: ComponentFixture<ResultComponent>;// Before each test, configure the testing module

  // Configure the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({// Configure the testing module
      declarations: [ResultComponent]// Declare the component to be tested
    });
    fixture = TestBed.createComponent(ResultComponent);// Create a fixture for the component
    component = fixture.componentInstance;// Assign the component to the component variable
    fixture.detectChanges();// Detect changes to the component
  });

  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();// Expect the component to be truthy
  });
});
