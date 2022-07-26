import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlotComponent } from './delete-slot.component';

describe('DeleteSlotComponent', () => {
  let component: DeleteSlotComponent;
  let fixture: ComponentFixture<DeleteSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
