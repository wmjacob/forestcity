import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fcl-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCollection(collection: string) {
    console.log('clicked in div, collection=' + collection);
  }

}
