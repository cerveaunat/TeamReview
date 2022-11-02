import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTeamsComponent } from './saved-teams.component';

describe('SavedTeamsComponent', () => {
  let component: SavedTeamsComponent;
  let fixture: ComponentFixture<SavedTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
