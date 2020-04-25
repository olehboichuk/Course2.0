import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTeacherComponent } from './profile-teacher.component';

describe('ProfileTeacherComponent', () => {
  let component: ProfileTeacherComponent;
  let fixture: ComponentFixture<ProfileTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
