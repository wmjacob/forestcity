import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BulletinComponent } from './bulletin/bulletin.component';
import { FutureEventsComponent } from './future-events/future-events.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { RecruitingComponent } from './recruiting/recruiting.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'future-events', component: FutureEventsComponent},
  {path: 'how-to-join', component: RecruitingComponent},
  {path: 'bulletin', component: BulletinComponent},
  {path: 'history', component: HistoryComponent},
  {path: '**', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
