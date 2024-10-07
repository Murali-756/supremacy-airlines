import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingseatComponent } from './bookingseat.component';

describe('BookingseatComponent', () => {
  let component: BookingseatComponent;
  let fixture: ComponentFixture<BookingseatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingseatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
