import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdOffcanvasContentComponent } from './ngbd-offcanvas-content.component';

describe('NgbdOffcanvasContentComponent', () => {
  let component: NgbdOffcanvasContentComponent;
  let fixture: ComponentFixture<NgbdOffcanvasContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbdOffcanvasContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgbdOffcanvasContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
