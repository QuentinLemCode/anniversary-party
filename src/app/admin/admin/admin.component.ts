import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { FullUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  usersList: FullUser[] = [];
  maxVote: number | null = null;

  constructor(
    private readonly users: UserService,
    private readonly settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.users.getAllUsers().subscribe({
      next: (users) => {
        this.usersList = users;
      },
    });
    this.settings.getMaxVotes().subscribe({
      next: (vote) => {
        this.maxVote = vote.maxVotes;
      },
    });
  }

  deleteUser(id: number) {
    this.users
      .delete(id)
      .pipe(mergeMap(() => this.users.getAllUsers()))
      .subscribe({
        next: (users) => {
          this.usersList = users;
        },
      });
  }

  unlockUser(id: number) {
    this.users
      .unlock(id)
      .pipe(mergeMap(() => this.users.getAllUsers()))
      .subscribe({
        next: (users) => {
          this.usersList = users;
        },
      });
  }

  setMaxVotes(value: number) {
    this.settings.setMaxVotes(value).subscribe({
      next: (vote) => {
        this.maxVote = vote.maxVotes;
      },
    });
  }
}
