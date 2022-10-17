import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
  homeSectionHeight: number = 0;
  aboutSectionRef: any;
  aboutSectionYPos: number = 0;
  aboutSectionHeight: number = 0;
  projectsSectionRef: any;
  projectsSectionYPos: number = 0;
  projectsSectionHeight: number = 0;
  contactSectionRef: any;
  contactSectionYPos: number = 0;
  currentYPos: number = 0;

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

    this.aboutSectionYPos = this.aboutSectionRef.offsetTop;
    this.projectsSectionYPos = this.projectsSectionRef.offsetTop;
    this.contactSectionYPos = this.contactSectionRef.offsetTop;
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
        this.homeSectionRef.scrollIntoView({ behavior: "smooth" });
        break;
      case id === "about":
        this.aboutSectionRef.scrollIntoView({ behavior: "smooth" });
        break;
      case id === "projects":
        this.projectsSectionRef.scrollIntoView({ behavior: "smooth" });
        break;
      case id === "contact":
        this.contactSectionRef.scrollIntoView({ behavior: "smooth" });
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.currentYPos = document.documentElement.scrollTop;
    this.homeSectionHeight = this.homeSectionRef.offsetHeight;
    this.aboutSectionYPos = this.aboutSectionRef.offsetTop;
    this.aboutSectionHeight = this.aboutSectionRef.offsetHeight;
    this.projectsSectionYPos = this.projectsSectionRef.offsetTop;
    this.projectsSectionHeight = this.projectsSectionRef.offsetHeight;
    this.contactSectionYPos = this.contactSectionRef.offsetTop;
  }
}
