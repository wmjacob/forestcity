import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { HistoryComponent } from './forest-city/our-history/history.component';
import { PastMastersComponent } from './forest-city/past-masters/past-masters.component';
import { BulletinComponent } from './forest-city/bulletin/bulletin.component';
import { FutureEventsComponent } from './forest-city/future-events/future-events.component';
import { RecruitingComponent } from './forest-city/recruiting/recruiting.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { OurOfficersComponent } from './forest-city/our-officers/our-officers.component';
import { AboutUsComponent } from './forest-city/about-us/about-us.component';
import { ImageGalleryComponent } from './forest-city/image-gallery/image-gallery.component';
import { GalleryCollectionComponent } from './forest-city/image-gallery/gallery-collection/gallery-collection.component';
import { RecentEventsComponent } from './forest-city/recent-events/recent-events.component';
import { PastBulletinsComponent } from './forest-city/past-bulletins/past-bulletins.component';
import { OperationBackpackComponent } from './forest-city/temp-events/operation-backpack/operation-backpack.component';
import { GoldenSquarePMComponent } from './forest-city/golden-square/past-masters/golden-square-pm.component';
import { ForestCityInTheCityComponent } from './forest-city/outings/forest-city-in-the-city/forest-city-in-the-city.component';

const IMAGE_GALLERY_URL = 'image-gallery';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'past-masters',
        component: PastMastersComponent
      },
      {
        path: 'bulletin',
        component: BulletinComponent
      },
      {
        path: 'upcoming-events',
        component: FutureEventsComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'our-officers',
        component: OurOfficersComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'how-to-join',
        component: RecruitingComponent
      },
      {
        path: IMAGE_GALLERY_URL,
        component: ImageGalleryComponent
      },
      {
        path: IMAGE_GALLERY_URL + '/:albumName',
        component: GalleryCollectionComponent
      },
      {
        path: 'recent-events',
        component: RecentEventsComponent
      },
      {
        path: 'past-bulletins',
        component: PastBulletinsComponent
      },
      {
        path: 'golden-square-past-masters',
        component: GoldenSquarePMComponent
      },
      {
        path: 'social-events',
        component: ForestCityInTheCityComponent
      }
      // {
      //   path: 'operation-backpack',
      //   component: OperationBackpackComponent
      // }
    ]
  },
  // routes without header or footer
  {
    // MUST BE LAST
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      scrollOffset: [0, 0],
      anchorScrolling: "enabled"
    }
  )
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
