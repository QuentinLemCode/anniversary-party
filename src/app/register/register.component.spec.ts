import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { RegisterComponent } from './register.component';
import { EMPTY } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: EMPTY
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
