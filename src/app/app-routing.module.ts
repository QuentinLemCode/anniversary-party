import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicManagerComponent } from './music-manager/music-manager.component';

const routes: Routes = [
  {path: 'music-manager', component: MusicManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
