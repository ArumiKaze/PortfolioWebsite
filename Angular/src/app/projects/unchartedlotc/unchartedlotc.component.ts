import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-unchartedlotc',
  templateUrl: './unchartedlotc.component.html',
  styleUrls: ['./unchartedlotc.component.css']
})
export class UnchartedlotcComponent implements OnInit {

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
