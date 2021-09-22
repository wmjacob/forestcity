import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { RsvpComponent } from './forest-city/future-events/rsvp/rsvp.component';
import { PastMastersService } from './forest-city/past-masters/service/past-masters.service';
import { OurOfficersComponent } from './forest-city/our-officers/our-officers.component';
import { AboutUsComponent } from './forest-city/about-us/about-us.component';
import { FooterComponent } from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    JoinComponent,
    PastMastersComponent,
    BulletinComponent,
    FutureEventsComponent,
    RsvpComponent,
    ContactUsComponent,
    OurOfficersComponent,
    AboutUsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
