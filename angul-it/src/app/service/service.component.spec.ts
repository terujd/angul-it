import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageService } from './service.component';

describe('StageService', () => {
  let component: StageService;
  let fixture: ComponentFixture<StageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageService]
    });
    fixture = TestBed.createComponent(StageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
