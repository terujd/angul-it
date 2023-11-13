import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StageService } from '../service/service.component';

export function resultGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const stageService = inject(StageService) as StageService;
  const router = inject(Router) as Router;
  
  if (stageService.getHighestStageCompleted() === stageService.getTotalStages()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
