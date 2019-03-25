import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { AppService } from './services/app.service';
import { OverlayConfig } from './common/OverlayConfig';

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
  config: OverlayConfig;
  visible = true;
  currentIndex = 0;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getOverlayConfig().subscribe(res => {
      this.config = res;

      // Don't use toggle interval for single element arrays
      if (this.config.textItems.length > 1) {
        // Convert seconds to milliseconds
        interval(this.config.interval * 1000).subscribe(x => {
          this.toggle();
        });
      }
    });
  }

  toggle() {
    this.visible = !this.visible;
  }

  onDone(event) {
    // We want to immediately show the text again upon hiding
    if (event.toState === 'hidden') {
      this.currentIndex = (this.currentIndex < this.config.textItems.length - 1) ? this.currentIndex + 1 : 0;
      this.toggle();
    }
  }
}
