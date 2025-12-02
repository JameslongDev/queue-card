import { ComponentFixture, TestBed } from '@angular/core/testing';

import { It052Component } from './it05-2.component';

describe('It052Component', () => {
  let component: It052Component;
  let fixture: ComponentFixture<It052Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [It052Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(It052Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
