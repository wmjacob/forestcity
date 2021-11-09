import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '@services/images';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fcl-gallery-collection',
  templateUrl: './gallery-collection.component.html',
  styleUrls: ['./gallery-collection.component.scss']
})
export class GalleryCollectionComponent implements OnInit, OnDestroy {
  private readonly FCL_IMAGE_BUCKET = 'https://storage.googleapis.com/storage/v1/b/forest-city-website-images/o';
  readonly IMAGE_URL_PREFIX = 'https://storage.googleapis.com/forest-city-website-images/';
  routeState: any;
  collection: string = '';
  loading: boolean = false;
  images: any;
  imageSub: Subscription = new Subscription;

  slideIndex = 0;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private imageService: ImageService) {
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

    this.imageSub = this.httpClient.get(this.FCL_IMAGE_BUCKET).subscribe(
      (data) => {
        const jsonObj = JSON.parse(JSON.stringify(data));
        const imageArray = jsonObj.items;

        const result = imageArray.filter((imageObj: any) => {
          return imageObj.name.includes(this.collection);
        })

        if(result) {
          this.images = result;
        }
      },
      (error) => {
        console.log('error=' + error);
      }
    );



    this.loading = false;
  }

  ngOnDestroy() {
    this.imageSub.unsubscribe();
  }

  openModal() {
    document.getElementById('imgModal')?.setAttribute('style', 'display:block');
  }

  closeModal() {
    document.getElementById('imgModal')?.setAttribute('style', 'display:none');
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
      dots[this.slideIndex - 1].className += " active";
    }
  }

}
