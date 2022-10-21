import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-contactsection',
  templateUrl: './contactsection.component.html',
  styleUrls: ['./contactsection.component.css'],
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(100%)" }),
        animate(
          "750ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(0)" }),
        animate(
          "600ms ease-in-out",
          style({ opacity: 0, transform: "translateY(100%)" })
        )
      ])
    ]),
    trigger("inOutMessageAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(
          "500ms ease-in-out",
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})
export class ContactsectionComponent implements OnInit, OnDestroy {

  unsubOnDestroy = new Subject<boolean>();
  isDarkMode!: boolean;

  isSendingEmail: boolean = false;
  successEmailResponse: boolean = false;
  failEmailResponse: boolean = false;

  formContact = this.fb.group({
    formName: ["", Validators.required],
    formEmail: ["", [Validators.required, Validators.email]],
    formMessage: ["", [Validators.required, Validators.minLength(10)]]
  });

  constructor(private generalService: GeneralService, private fb: FormBuilder) { }

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

  SubmitContact() {
    this.formContact.disable();
    this.isSendingEmail = true;
    this.generalService.SendEmail(JSON.stringify(this.formContact.value)).subscribe({
      next: (response) => {
        this.successEmailResponse = true;
        this.isSendingEmail = false;
        this.formContact.reset();
        this.formContact.enable();
      },
      error: (err) => {
        this.failEmailResponse = true;
        this.isSendingEmail = false;
        this.formContact.enable();
        this.ResetMessage();
      },
      complete: () => {
        this.ResetMessage();
      }
    });
  }

  ResetMessage() {
    timer(10000).subscribe({
      next: () => {
        this.failEmailResponse = false;
        this.successEmailResponse = false;
      }
    });
  }
}
