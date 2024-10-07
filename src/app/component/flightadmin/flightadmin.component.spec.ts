import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightAdminComponent } from './flightadmin.component';


describe('FlightadminComponent', () => {
  let component: FlightAdminComponent;
  let fixture: ComponentFixture<FlightAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
