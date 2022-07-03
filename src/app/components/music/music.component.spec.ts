import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EMPTY } from 'rxjs';
import { QueueService } from '../../services/queue.service';
import { UserService } from '../../services/user.service';

import { MusicComponent } from './music.component';

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicComponent],
      imports: [FontAwesomeModule],
      providers: [
        {
          provide: QueueService,
          useValue: {
            forward: EMPTY,
            delete: EMPTY,
          },
        },
        {
          provide: UserService,
          useValue: {
            isAdmin: false,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
