import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { MindfulComponent } from './projects/mindful/mindful.component';
import { UnchartedlotcComponent } from './projects/unchartedlotc/unchartedlotc.component';
import { ShinguruComponent } from './projects/shinguru/shinguru.component';
import { LastofusparttwoComponent } from './projects/lastofusparttwo/lastofusparttwo.component';
import { ShroommatesComponent } from './projects/shroommates/shroommates.component';
import { SengokuComponent } from './projects/sengoku/sengoku.component';
import { TalchulComponent } from './projects/talchul/talchul.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    AboutsectionComponent,
    ProjectsectionComponent,
    ContactsectionComponent,
    LastofuspartoneComponent,
    MindfulComponent,
    UnchartedlotcComponent,
    ShinguruComponent,
    LastofusparttwoComponent,
    ShroommatesComponent,
    SengokuComponent,
    TalchulComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
