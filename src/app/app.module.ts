import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login.component';
import { HeaderComponent } from './core/header/header.component';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinComponent } from './core/join/how-to-join/join.component';
import { BulletinComponent } from './forest-city/bulletin/bulletin.component';
import { FutureEventsComponent } from './forest-city/future-events/future-events.component';
import { HistoryComponent } from './forest-city/our-history/history.component';
import { PastMastersComponent } from './forest-city/past-masters/past-masters.component';
import { HttpClientModule } from '@angular/common/http';
import { PastMastersService } from './forest-city/past-masters/service/past-masters.service';
import { RsvpComponent } from './forest-city/future-events/rsvp/rsvp.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    JoinComponent,
    PastMastersComponent,
    BulletinComponent,
    FutureEventsComponent,
    RsvpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PastMastersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
