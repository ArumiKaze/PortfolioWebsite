import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  subjectToggleDarkMode = new Subject<void>();
  isDarkMode: boolean = true;

  constructor(private http: HttpClient) { }

  GetDarkModeStatus(): boolean {
    return this.isDarkMode;
  }

  ToggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("isDarkMode", this.isDarkMode ? "dark" : "light");
  }

  SendEmail(emailPayload: string) {
    return this.http.post("https://eisakuimura.com/sendEmail", emailPayload, {headers: {'content-type': 'application/json'}});
  }
}
