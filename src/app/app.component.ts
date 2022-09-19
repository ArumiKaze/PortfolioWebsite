import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  unsubOnDestroy = new Subject<boolean>();

  constructor(private generalService: GeneralService, private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    //get the saved dark/light mode setting if the user previously visited the website, if not it's dark mode by default
    if (localStorage.getItem("isDarkMode") === "light") {
      this.generalService.ToggleDarkMode();
    }

    if (this.generalService.GetDarkModeStatus()) {
      this.renderer.addClass(this.elementRef.nativeElement.ownerDocument.body, "dark-mode-bg");
    }
    else {
      this.renderer.addClass(this.elementRef.nativeElement.ownerDocument.body, "light-mode-bg");
    }

    this.generalService.subjectToggleDarkMode.pipe(takeUntil(this.unsubOnDestroy)).subscribe({
      next: () => {
        if (this.generalService.GetDarkModeStatus()) {
          this.renderer.addClass(this.elementRef.nativeElement.ownerDocument.body, "dark-mode-bg");
          this.renderer.removeClass(this.elementRef.nativeElement.ownerDocument.body, "light-mode-bg");
        }
        else {
          this.renderer.addClass(this.elementRef.nativeElement.ownerDocument.body, "light-mode-bg");
          this.renderer.removeClass(this.elementRef.nativeElement.ownerDocument.body, "dark-mode-bg");
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubOnDestroy.next(true);
    this.unsubOnDestroy.complete();
  }
}