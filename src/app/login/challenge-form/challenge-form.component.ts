import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss'],
})
export class ChallengeFormComponent {
  @Output()
  challengeSubmit = new EventEmitter<string>();

  emojis = [
    { emoji: '😂', description: 'Face with tears of joy' },
    { emoji: '❤️', description: 'Red heart' },
    { emoji: '🤣', description: 'Rolling on the floor laughing' },
    { emoji: '👍', description: 'Thumbs up' },
    { emoji: '😭', description: 'Loudly crying face' },
    { emoji: '🙏', description: 'Folded hands' },
    { emoji: '😘', description: 'Face blowing a kiss' },
    { emoji: '🥰', description: 'Smiling face with hearts' },
    { emoji: '😍', description: 'Smiling face with heart-eyes' },
    { emoji: '😊', description: 'Smiling face with smiling eyes' },
  ];

  error = '';

  form = new FormGroup({
    emojiControl: new FormControl(''),
    birthYearControl: new FormControl(''),
  });

  get emojiValue() {
    return this.form.controls.emojiControl.value;
  }

  get birthYearValue() {
    return this.form.controls.birthYearControl.value;
  }

  // TODO add favorite color

  submit() {
    const challenge = this.getChallengeCode();
    if (challenge === null) {
      this.error = 'Vous devez choisir';
      return;
    }
    this.challengeSubmit.next(challenge);
  }

  getChallengeCode() {
    if (this.emojiValue === null || this.birthYearValue === null) {
      return null;
    }
    return this.emojiValue + this.birthYearValue;
  }
}
