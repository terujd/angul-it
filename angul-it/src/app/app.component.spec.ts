import { TestBed } from '@angular/core/testing'; // Import necessary testing modules and component dependencies from Angular
import { RouterTestingModule } from '@angular/router/testing'; // Import necessary testing modules and component dependencies from Angular
import { AppComponent } from './app.component'; // Import the component to be tested

// Start of the test suite for the component
describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({// Configure the testing module
    imports: [RouterTestingModule],// Import the RouterTestingModule
    declarations: [AppComponent]// Declare the component to be tested
  }));

  // Test that the component is created
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);// Create a fixture for the component
    const app = fixture.componentInstance;// Assign the component to the component variable
    expect(app).toBeTruthy();// Expect the component to be truthy
  });

  // Test that the component has the correct title
  it(`should have as title 'angul-it-new'`, () => {
    const fixture = TestBed.createComponent(AppComponent);// Create a fixture for the component
    const app = fixture.componentInstance;// Assign the component to the component variable
    expect(app.title).toEqual('angul-it-new');// Expect the component to have the correct title
  });

  // Test that the component renders the correct title
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);// Create a fixture for the component
    fixture.detectChanges();// Detect changes to the component
    const compiled = fixture.nativeElement as HTMLElement;// Assign the component to the component variable
    expect(compiled.querySelector('.content span')?.textContent).toContain('angul-it-new app is running!');// Expect the component to render the correct title
  });
});
