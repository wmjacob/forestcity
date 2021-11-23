import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface PhotoAlbum {
  albumName: string;
  title: string;
  subtitle: string;
  description: string;
}

const albums: PhotoAlbum[] = [
  {
    albumName: '2021_11_17_Kakou_DDGM_Installation',
    title: 'DDGM Installation',
    subtitle: 'Franck T. Kakou',
    description: 'Forest City Lodge\'s Very Own'
  },
  {
    albumName: '2019_12_05_Brotherhood_Night',
    title: 'Brotherhood Night 2019',
    subtitle: 'Step Into The Light',
    description: 'An Evening of Fellowship, Charity, and Brotherly Love'
  },
  {
    albumName: '2019_06_19_Table_Lodge',
    title: 'Table Lodge 2019',
    subtitle: '',
    description: ''
  },
  {
    albumName: '2018_12_06_Brotherhood_Night',
    title: 'Brotherhood Night 2018',
    subtitle: 'Invest',
    description: ''
  },
  {
    albumName: '2018_03_08_Awards_Night',
    title: 'Awards Night 2018',
    subtitle: '',
    description: ''
  },
  {
    albumName: '2018_02_08_Valentines_Day_Dinner',
    title: 'Valentine\'s Day Dinner 2018',
    subtitle: 'Wing It',
    description: 'With Special Guests'
  },
  {
    albumName: '2017_08_24_Steak_Roast',
    title: 'Steak Roast 2017',
    subtitle: '',
    description: 'At Horseshoe Lake Park in Cleveland Heights, OH'
  },
  {
    albumName: '2017_05_17_Special_Guest_Night_Brad_Stuver',
    title: 'Special Guest Night 2017',
    subtitle: 'With Brad Stuver',
    description: 'Professional Major League Soccer Goalkeeper'
  },
  {
    albumName: '2017_03_29_Awards_Night',
    title: 'Awards Night 2017',
    subtitle: '',
    description: ''
  },
  {
    albumName: '2017_03_15_Sports_Night',
    title: 'Sports Night 2017',
    subtitle: 'With Jim Chones',
    description: 'Former NBA Basketball Player with the Cleveland Cavaliers'
  },
  {
    albumName: '2016_12_08_Brotherhood_Night',
    title: 'Brotherhood Night 2016',
    subtitle: 'Freemasonry',
    description: 'A Brotherhood of Values'
  },
  {
    albumName: '2016_08_17_Steak_Roast',
    title: 'Steak Roast 2019',
    subtitle: 'Another Great Steak Roast',
    description: ''
  },
]

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

  goToCollection(collection: string) {
    this.router.navigate(['gallery-collection'], {state: {data: collection}, relativeTo: this.route});
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    window.scroll(0,0);
  }

}
