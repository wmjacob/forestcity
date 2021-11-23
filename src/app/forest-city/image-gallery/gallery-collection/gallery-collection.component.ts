import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from  'ng-gallery/lightbox';

@Component({
  selector: 'fcl-gallery-collection',
  templateUrl: './gallery-collection.component.html',
  styleUrls: ['./gallery-collection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryCollectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly FCL_IMAGE_BUCKET = 'https://storage.googleapis.com/storage/v1/b/forest-city-website-images/o';
  readonly IMAGE_URL_PREFIX = 'https://storage.googleapis.com/forest-city-website-images/';
  routeState: any;
  collection: string = '';
  loading: boolean = false;
  images: any;
  imageSub: Subscription = new Subscription;
  header: string = '';

  galleryImages: GalleryItem[] = [];
  items: GalleryItem[] = [];

  slideIndex = 0;

  constructor(private router: Router,
              private httpClient: HttpClient,
              public gallery: Gallery,
              public lightbox: Lightbox) {
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router.getCurrentNavigation()?.extras.state;
      if(this.routeState) {
        this.collection = this.routeState.data;
      }
    }
    else {
      this.router.navigate(['image-gallery']);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.setHeader();
    this.imageSub = this.httpClient.get(this.FCL_IMAGE_BUCKET).subscribe(
      (data) => {
        const jsonObj = JSON.parse(JSON.stringify(data));
        const imageArray = jsonObj.items;

        const result = imageArray.filter((imageObj: any) => {
          return imageObj.name.includes(this.collection) && !imageObj.name.includes('cover');
        })

        if(result) {
          this.images = result;
          this.loadGalleryImages();
          this.gallery.ref().load(this.items);
        }
      },
      (error) => {
        console.log('error=' + error);
      }
    );
  }

  setHeader() {
    // Example name from object: 2019_06_19_Table_Lodge
    let event = this.collection.substr(11).replace('_', ' ');
    let year = this.collection.substr(0, 4);
    this.header = event + ' ' + year;
  }

  loadGalleryImages() {
    for(let i = 0; i < this.images.length; i++) {
      this.items.push(
        new ImageItem({ src: this.IMAGE_URL_PREFIX + this.images[i].name,
                        thumb: this.IMAGE_URL_PREFIX + this.images[i].name })
      );
    }
  }

  openLightbox(index: number) {
    this.lightbox.setConfig({panelClass: 'fullscreen'});
    this.lightbox.open(index);
  }

  ngAfterViewInit() {
    this.loading = false;
  }

  ngOnDestroy() {
    this.imageSub.unsubscribe();
  }

}
