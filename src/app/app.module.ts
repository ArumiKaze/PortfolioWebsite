import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AboutsectionComponent } from './aboutsection/aboutsection.component';
import { ProjectsectionComponent } from './projectsection/projectsection.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LastofuspartoneComponent } from './projects/lastofuspartone/lastofuspartone.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    AboutsectionComponent,
    ProjectsectionComponent,
    ContactsectionComponent,
    LastofuspartoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
