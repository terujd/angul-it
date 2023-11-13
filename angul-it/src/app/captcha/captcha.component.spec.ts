import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing modules and component dependencies from Angular
import { CaptchaComponent } from './captcha.component'; // Import the component to be tested

// Start of the test suite for the component
describe('CaptchaComponent', () => {
  // Declare variables for the component and fixture
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;

  // Before each test, configure the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({// Configure the testing module
      declarations: [CaptchaComponent]// Declare the component to be tested
    });
    fixture = TestBed.createComponent(CaptchaComponent);// Create a fixture for the component
    component = fixture.componentInstance;// Assign the component to the component variable
    fixture.detectChanges();// Detect changes to the component
  });
  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();// Expect the component to be truthy
  });
});
