import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyAuthComponent } from './admin/spotify-auth/spotify-auth.component';
import { SpotifyDeviceComponent } from './admin/spotify-device/spotify-device.component';
import { MusicManagerComponent } from './music-manager/music-manager.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/not-auth.guard';

const routes: Routes = [
  {path: 'admin/spotify-auth', component: SpotifyAuthComponent, canActivate: [AuthGuard]},
  {path: 'admin/spotify-device', component: SpotifyDeviceComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'music-manager', component: MusicManagerComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
