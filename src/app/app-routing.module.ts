import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyAuthComponent } from './admin/spotify-auth/spotify-auth.component';
import { SpotifyDeviceComponent } from './admin/spotify-device/spotify-device.component';
import { MusicManagerComponent } from './music-manager/music-manager.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'admin/spotify-auth', component: SpotifyAuthComponent},
  {path: 'admin/spotify-device', component: SpotifyDeviceComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'music-manager', component: MusicManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
