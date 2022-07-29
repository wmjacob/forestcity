import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PhotoAlbum } from '@data/interfaces';
import albums from '@data/photo-albums.json';
import { LocalStorageService } from '@services/localStorageService';

@Component({
  selector: 'fcl-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  pageOfItems: Array<any> = [];
  albums: PhotoAlbum[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        if(!event.url.includes('image-gallery')) {
          this.localStorageService.clearData();
        }
      }
    });
  }

  ngOnInit(): void {
    this.albums = albums;
  }

  goToCollection(album: PhotoAlbum) {
    this.router.navigate([album.albumName], {relativeTo: this.route});
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    window.scroll(0,0);
  }

}
