import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SpotifyDeviceComponent } from './admin/spotify-device/spotify-device.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengeFormComponent } from './login/challenge-form/challenge-form.component';
import { ChallengeComponent } from './login/challenge/challenge.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './login/password/password.component';
import { RegisterComponent } from './login/register/register.component';
import { MainComponent } from './main/main.component';
import { MusicManagerComponent } from './music-manager/music-manager.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MusicComponent } from './components/music/music.component';
import { QueueComponent } from './components/queue/queue.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MusicManagerComponent,
    SpotifyDeviceComponent,
    LoginComponent,
    NotFoundComponent,
    MainComponent,
    PasswordComponent,
    ChallengeComponent,
    RegisterComponent,
    ChallengeFormComponent,
    MusicComponent,
    QueueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
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
