import { ComponentFixture, TestBed } from '@angular/core/testing';

import { It051Component } from './it05-1.component';

describe('It051Component', () => {
  let component: It051Component;
  let fixture: ComponentFixture<It051Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [It051Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(It051Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
