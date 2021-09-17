import { Component, OnInit } from '@angular/core';
import officers from '@data/current-officers.json';

interface CurrentOfficers {
  name: string,
  office: string,
  image: string,
  bio: string,
  jewel: string
}

@Component({
  selector: 'app-our-officers',
  templateUrl: './our-officers.component.html',
  styleUrls: ['./our-officers.component.scss']
})
export class OurOfficersComponent implements OnInit {

  officers: CurrentOfficers[] = [];

  constructor() { }

  ngOnInit(): void {
    this.officers = officers.map(
      officer => ({ ...officer, image: `../../../assets/images/${officer.image}`})
    ).map(officer => ({ ...officer, jewel: `../../../assets/images/officer-jewels/${officer.jewel}`}));
  }

}
