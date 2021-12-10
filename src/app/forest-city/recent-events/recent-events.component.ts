import { Component, HostListener, OnInit } from '@angular/core';
import { RecentEvent } from '@data/interfaces';
import recentEvents from '@data/recent-events.json'
@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss']
})
export class RecentEventsComponent implements OnInit {
  recentEvents: RecentEvent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.recentEvents = recentEvents
      .filter(event => (Date.now() - (new Date(event.eventDate)).getTime()) / (1000 * 3600 * 24 * 365) < 1);
  }

  hasMultipleImages(urls: string[]) {
    return urls.length > 1;
  }

  @HostListener('window:scroll', []) onScroll() {
    let topBtn = document.getElementById('returnToTop') as HTMLElement;
    if(topBtn) {
        const mobile = window.matchMedia('(max-width: 1023px)');
        if(mobile.matches) {
            topBtn.style.display = 'none';
            // delayed display for mobile after scrolling
            if(this.hasScrolled()) {
                setTimeout(function() {
                    topBtn.style.display = 'block';
                }, 2000);
            }
            else {
                topBtn.style.display = 'none';
            }
        }
        else {
            if(this.hasScrolled()) {
                topBtn.style.display = 'block';
            }
            else {
                topBtn.style.display = 'none';
            }
        }
    }
}

hasScrolled(): boolean {
    return document.body.scrollTop > 400 || document.documentElement.scrollTop > 400
}

  goToTop() {
    window.scroll(0,0);
  }

}
