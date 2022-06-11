import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyAuthComponent } from './admin/spotify-auth/spotify-auth.component';
import { SpotifyDeviceComponent } from './admin/spotify-device/spotify-device.component';
import { MusicManagerComponent } from './music-manager/music-manager.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/not-auth.guard';
import { AdminGuard } from './shared/admin.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PasswordComponent } from './login/password/password.component';
import { ChallengeComponent } from './login/challenge/challenge.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  {
    path: 'admin/spotify-auth',
    component: SpotifyAuthComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/spotify-device',
    component: SpotifyDeviceComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'login/password',
    component: PasswordComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'login/challenge',
    component: ChallengeComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'login/register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'music-manager',
    component: MusicManagerComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
