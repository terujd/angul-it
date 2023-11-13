import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing modules and component dependencies from Angular

import { StageService } from './service.component'; // Import the component to be tested

// Start of the test suite for the component
describe('StageService', () => {
  let component: StageService;// Declare variables for the component and fixture
  let fixture: ComponentFixture<StageService>;//

  // Before each test, configure the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({// Configure the testing module
      declarations: [StageService]// Declare the component to be tested
    });
    fixture = TestBed.createComponent(StageService);// Create a fixture for the component
    component = fixture.componentInstance;// Assign the component to the component variable
    fixture.detectChanges();// Detect changes to the component
  });

  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();// Expect the component to be truthy
  });
});
