import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private generalService: GeneralService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("isDarkMode") === "light") {
      this.generalService.ToggleDarkMode();
    }
  }
}