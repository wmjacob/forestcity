import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login.component';
// import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/home/home.component';
import { FormsModule } from '@angular/forms';
import { JoinComponent } from './core/join/how-to-join/join.component';
import { BulletinComponent } from './forest-city/bulletin/bulletin.component';
import { FutureEventsComponent } from './forest-city/future-events/future-events.component';
import { HistoryComponent } from './forest-city/our-history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    JoinComponent,
    BulletinComponent,
    FutureEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
