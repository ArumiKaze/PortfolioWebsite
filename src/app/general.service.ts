import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  subjectToggleDarkMode = new Subject<void>();
  isDarkMode: boolean = true;

  constructor() { }

  GetDarkModeStatus(): boolean {
    return this.isDarkMode;
  }

  ToggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("isDarkMode", this.isDarkMode ? "dark" : "light");
  }
}
