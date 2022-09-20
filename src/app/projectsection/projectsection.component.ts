import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-projectsection',
  templateUrl: './projectsection.component.html',
  styleUrls: ['./projectsection.component.css']
})
export class ProjectsectionComponent implements OnInit, OnDestroy {

  unsubOnDestroy = new Subject<boolean>();
  isDarkMode!: boolean;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.isDarkMode = this.generalService.GetDarkModeStatus();
    this.generalService.subjectToggleDarkMode.pipe(takeUntil(this.unsubOnDestroy)).subscribe({
      next: () => {
        this.isDarkMode = !this.isDarkMode;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubOnDestroy.next(true);
    this.unsubOnDestroy.complete();
  }
}
