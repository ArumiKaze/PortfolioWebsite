import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-lastofuspartone',
  templateUrl: './lastofuspartone.component.html',
  styleUrls: ['./lastofuspartone.component.css']
})
export class LastofuspartoneComponent implements OnInit {

  unsubOnDestroy = new Subject<boolean>();
  isDarkMode!: boolean;

  projectsSectionRef: any;
  
  @Output() backToProjectList = new EventEmitter<void>();

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.isDarkMode = this.generalService.GetDarkModeStatus();
    this.generalService.subjectToggleDarkMode.pipe(takeUntil(this.unsubOnDestroy)).subscribe({
      next: () => {
        this.isDarkMode = !this.isDarkMode;
      }
    });

    this.projectsSectionRef = document.querySelector("#projects");
  }

  ngOnDestroy(): void {
    this.unsubOnDestroy.next(true);
    this.unsubOnDestroy.complete();
  }

  BackToProjectList(): void {
    this.backToProjectList.emit();
    this.projectsSectionRef.scrollIntoView({behavior: "smooth"});
  }
}
