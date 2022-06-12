import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicManagerComponent } from './music-manager/music-manager.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyDeviceComponent } from './admin/spotify-device/spotify-device.component';
import { SpotifyAuthComponent } from './admin/spotify-auth/spotify-auth.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PasswordComponent } from './login/password/password.component';
import { ChallengeComponent } from './login/challenge/challenge.component';
import { RegisterComponent } from './login/register/register.component';
import { ChallengeFormComponent } from './login/challenge-form/challenge-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicManagerComponent,
    SpotifyDeviceComponent,
    SpotifyAuthComponent,
    LoginComponent,
    NotFoundComponent,
    MainComponent,
    PasswordComponent,
    ChallengeComponent,
    RegisterComponent,
    ChallengeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
