import { inject } from '@angular/core'; // Import the inject function from Angular
// Import the ActivatedRouteSnapshot, Router, RouterStateSnapshot, and UrlTree modules from Angular
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; // Import the Observable module from rxjs
import { StageService } from '../service/service.component'; // Import the StageService

// Function to guard the result route from being accessed without completing all the stages
export function resultGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const stageService = inject(StageService) as StageService;// Inject the StageService
  const router = inject(Router) as Router;// Inject the Router
  
  // If the highest stage completed is equal to the total number of stages, return true
  if (stageService.getHighestStageCompleted() === stageService.getTotalStages()) {
    return true;
  } else {
    router.navigate(['/']);// Otherwise, navigate back to the home page
    return false;
  }
}
