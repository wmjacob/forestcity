import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoAlbum } from '@data/interfaces';
import albums from '@data/photo-albums.json';

@Component({
  selector: 'fcl-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  pageOfItems: Array<any> = [];
  albums: PhotoAlbum[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

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
