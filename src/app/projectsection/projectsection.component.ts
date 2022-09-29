import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-projectsection',
  templateUrl: './projectsection.component.html',
  styleUrls: ['./projectsection.component.css'],
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(
          "1000ms ease-in-out",
          style({ opacity: 1 })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, position: "absolute", top: 0, left: 0, right: 0}),
        animate(
          "500ms ease-in-out",
          style({ opacity: 0 })
        )
      ])
    ])
  ]
})
export class ProjectsectionComponent implements OnInit, OnDestroy {

  unsubOnDestroy = new Subject<boolean>();
  isDarkMode!: boolean;

  currentSelectedProject: string = "";

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

  ViewProject(projectName: string): void {
    this.currentSelectedProject = projectName;
  }

  ReturnToProjectList(): void {
    this.currentSelectedProject = "";
  }
}
