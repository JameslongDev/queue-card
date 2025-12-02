import { ComponentFixture, TestBed } from '@angular/core/testing';

import { It053Component } from './it05-3.component';

describe('It053Component', () => {
  let component: It053Component;
  let fixture: ComponentFixture<It053Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [It053Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(It053Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
