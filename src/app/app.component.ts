import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('visibility', [
      state('visible', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('visible => hidden', [
        animate('0.5s')
      ]),
      transition('hidden => visible', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent {
  visible = true;
  count = 0;

  ngOnInit() {
    interval(5000).subscribe(x => {
      this.toggle();
    });
  }

  toggle() {
    this.visible = !this.visible;
  }

  onDone(event) {
    // We want to immediately show the text again upon hiding
    if (event.toState === 'hidden') {
      this.count++;
      this.toggle();
    }
  }
}
