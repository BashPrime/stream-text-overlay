import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverlayConfig } from '../common/OverlayConfig';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getOverlayConfig(): Observable<OverlayConfig> {
    return this.http.get('./assets/overlay.json') as Observable<OverlayConfig>;
  }
}
