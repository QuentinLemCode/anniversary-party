import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyDeviceComponent } from './spotify-device.component';

describe('SpotifyDeviceComponent', () => {
  let component: SpotifyDeviceComponent;
  let fixture: ComponentFixture<SpotifyDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
