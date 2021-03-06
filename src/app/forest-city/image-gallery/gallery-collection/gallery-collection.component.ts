import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gallery, GalleryItem, ImageItem, ThumbnailsMode } from 'ng-gallery';
import { Lightbox } from  'ng-gallery/lightbox';
import albums from '@data/photo-albums.json'
import { PhotoAlbum } from '@data/interfaces';

@Component({
  selector: 'fcl-gallery-collection',
  templateUrl: './gallery-collection.component.html',
  styleUrls: ['./gallery-collection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryCollectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly FCL_IMAGE_BUCKET = 'https://storage.googleapis.com/storage/v1/b/forest-city-website-images/o?prefix=';
  readonly IMAGE_URL_PREFIX = 'https://storage.googleapis.com/forest-city-website-images/';
  readonly THUMB_URL_PREFIX = 'https://storage.googleapis.com/forest-city-website-images-thumbs/';

  albumInfo: PhotoAlbum[] = [];
  routeState: any;
  loading: boolean = false;
  images: any;
  imageSub: Subscription = new Subscription;
  albumNameParam: string | null = '';
  albumName: string = '';
  header: string = '';
  title: string = '';
  subtitle: string = '';
  description: string = '';

  galleryImages: GalleryItem[] = [];
  items: GalleryItem[] = [];

  slideIndex = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              public gallery: Gallery,
              public lightbox: Lightbox) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.albumNameParam = this.route.snapshot.paramMap.get('albumName');
    if(this.albumNameParam) {
      this.albumName = this.albumNameParam;
    }
    this.imageSub = this.httpClient.get(this.FCL_IMAGE_BUCKET + this.albumName + '/').subscribe(
      (data) => {
        const jsonObj = JSON.parse(JSON.stringify(data));
        const imageArray = jsonObj.items;
        const result = imageArray.filter((imageObj: any) => {
          return !imageObj.name.includes('cover');
        })

        if(result) {
          this.setAlbumInfo();
          this.images = result;
          this.loadGalleryImages();
          this.gallery.ref().load(this.items);
        }
      },
      (error) => {
        this.router.navigate(['image-gallery']);
      }
    );
  }

  setAlbumInfo() {
    albums.forEach(album => {
      if(album.albumName.includes(this.albumName)) {
        this.title = album.title;
        this.subtitle = album.subtitle;
        this.description = album.description;
        return;
      }
    });
  }

  loadGalleryImages() {
    for(let i = 0; i < this.images.length; i++) {
      this.items.push(
        new ImageItem({ src: this.IMAGE_URL_PREFIX + this.images[i].name,
                        thumb: this.THUMB_URL_PREFIX + this.images[i].name })
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
