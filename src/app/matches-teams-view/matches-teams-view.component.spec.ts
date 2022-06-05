import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesTeamsViewComponent } from './matches-temas-view.component';

describe('MatchesViewComponent', () => {
  let component: MatchesTeamsViewComponent;
  let fixture: ComponentFixture<MatchesTeamsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesTeamsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesTeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
