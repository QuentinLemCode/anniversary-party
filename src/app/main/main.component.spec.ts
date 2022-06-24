import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueueService } from '../services/queue.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        {
          provide: QueueService,
          useValue: {
            get: () => Promise.resolve([{ music: { id: '1' } }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
