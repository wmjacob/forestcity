import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

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
import { UniversityHeightsPMComponent } from './forest-city/past-masters/uh-past-masters.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { RsvpComponent } from './forest-city/future-events/rsvp/rsvp.component';
import { PastMastersService } from './forest-city/past-masters/service/past-masters.service';
import { OurOfficersComponent } from './forest-city/our-officers/our-officers.component';
import { AboutUsComponent } from './forest-city/about-us/about-us.component';
import { FooterComponent } from './core/footer/footer.component';
import { JwPaginationComponent } from './forest-city/past-masters/pagination/jw-pagination.component';
import { ImageGalleryComponent } from './forest-city/image-gallery/image-gallery.component';
import { GalleryCollectionComponent } from './forest-city/image-gallery/gallery-collection/gallery-collection.component';
import { GalleryModule, GALLERY_CONFIG } from 'ng-gallery'
import { LightboxModule, LIGHTBOX_CONFIG } from  'ng-gallery/lightbox';
import { JwImgPaginationComponent } from './forest-city/image-gallery/pagination/jw-img-pagination.component';
import { RecentEventsComponent } from './forest-city/recent-events/recent-events.component';
import { PastBulletinsComponent } from './forest-city/past-bulletins/past-bulletins.component';
import { JwBltPaginationComponent } from './forest-city/past-bulletins/pagination/jw-blt-pagination.component';
import { OperationBackpackComponent } from './forest-city/temp-events/operation-backpack/operation-backpack.component';
import { GoldenSquarePMComponent } from './forest-city/golden-square/past-masters/golden-square-pm.component';
import { MitzvahCommitteeEventsComponent } from './forest-city/mitzvah-committee/mitzvah-committee-events.component';
import { MitzvahRsvpComponent } from './forest-city/mitzvah-committee/mitzvah-rsvp/mitzvah-rsvp.component';
import { BrotherhoodNightHistoryComponent } from './forest-city/brotherhood-night/history/brotherhood-night-history.component';
import { ContactSunshineCommitteeComponent } from './core/contact-sunshine-committee/contact-sunshine-committee.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    JoinComponent,
    PastMastersComponent,
    UniversityHeightsPMComponent,
    BulletinComponent,
    FutureEventsComponent,
    RsvpComponent,
    ContactUsComponent,
    OurOfficersComponent,
    AboutUsComponent,
    FooterComponent,
    JwPaginationComponent,
    JwImgPaginationComponent,
    ImageGalleryComponent,
    GalleryCollectionComponent,
    RecentEventsComponent,
    PastBulletinsComponent,
    JwBltPaginationComponent,
    OperationBackpackComponent,
    GoldenSquarePMComponent,
    MitzvahCommitteeEventsComponent,
    MitzvahRsvpComponent,
    BrotherhoodNightHistoryComponent,
    ContactSunshineCommitteeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGoogleAnalyticsModule.forRoot('G-XVY2D29X41'),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GalleryModule,
    LightboxModule
  ],
  providers: [
    PastMastersService,
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: false,
        imageSize: 'cover'
      }
    },
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: true
      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
