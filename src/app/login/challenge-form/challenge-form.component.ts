import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss'],
})
export class ChallengeFormComponent implements OnInit {
  @Output()
  challengeSubmit = new EventEmitter<string>();

  private static readonly EMOJIS = [
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
    { emoji: '🔥', description: 'Fire' },
  ];

  emojis = this.shuffleEmoji(ChallengeFormComponent.EMOJIS);

  error = '';

  form = new FormGroup({
    emojiControl: new FormControl(''),
    birthYearControl: new FormControl(''),
  });

  @ViewChild('input')
  yearInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    setTimeout(() => {
      this.yearInput.nativeElement.focus();
      window.scroll({ top: 0 });
    }, 0);
  }

  get emojiValue() {
    return this.form.controls.emojiControl.value;
  }

  get birthYearValue() {
    return this.form.controls.birthYearControl.value;
  }

  submit() {
    const challenge = this.getChallengeCode();
    if (challenge === null) {
      return;
    }
    this.challengeSubmit.next(challenge);
  }

  getChallengeCode() {
    if (this.form.controls.emojiControl.invalid || this.emojiValue === null) {
      this.error = 'Vous devez choisir un emoji.';
      return null;
    }
    if (
      this.form.controls.birthYearControl.invalid ||
      this.birthYearValue === null
    ) {
      this.error = 'Vous devez entrer votre année de naissance.';
      return null;
    }
    return this.emojiValue + this.birthYearValue;
  }

  private shuffleEmoji(emojis: typeof ChallengeFormComponent.EMOJIS) {
    let currentIndex = emojis.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [emojis[currentIndex], emojis[randomIndex]] = [
        emojis[randomIndex],
        emojis[currentIndex],
      ];
    }

    return emojis;
  }
}
