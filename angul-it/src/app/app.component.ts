import { Component } from '@angular/core'; // Import necessary modules from Angular


@Component({// Component decorator
  selector: 'app-root',// Selector
  templateUrl: './app.component.html',// Template URL
  styleUrls: ['./app.component.scss']// Style URLs
})
export class AppComponent {// Component class
  title = 'angul-it-new';// Public property to hold the title
}
