import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  unsubOnDestroy = new Subject<boolean>();
  isDarkMode!: boolean;

  homeSectionRef: any;
  aboutSectionRef: any;
  projectsSectionRef: any;
  contactSectionRef: any;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.isDarkMode = this.generalService.GetDarkModeStatus();
    this.generalService.subjectToggleDarkMode.pipe(takeUntil(this.unsubOnDestroy)).subscribe({
      next: () => {
        this.isDarkMode = !this.isDarkMode;
      }
    });

    this.homeSectionRef = document.querySelector("#home");
    this.aboutSectionRef = document.querySelector("#about");
    this.projectsSectionRef = document.querySelector("#projects");
    this.contactSectionRef = document.querySelector("#contact");
  }

  ngOnDestroy(): void {
    this.unsubOnDestroy.next(true);
    this.unsubOnDestroy.complete();
  }

  ToggleDarkMode(): void {
    this.generalService.ToggleDarkMode();
    this.generalService.subjectToggleDarkMode.next();
  }

  ScrollToSection(id: string): void {
    switch (true) {
      case id === "home":
        this.homeSectionRef.scrollIntoView({behavior: "smooth"});
        break;
      case id === "about":
        this.aboutSectionRef.scrollIntoView({behavior: "smooth"});
        break;
      case id === "projects":
        this.projectsSectionRef.scrollIntoView({behavior: "smooth"});
        break;
      case id === "contact":
        this.contactSectionRef.scrollIntoView({behavior: "smooth"});
        break;
    }
  }
}
