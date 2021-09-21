import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyrightYear: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.copyrightYear = new Date().getFullYear();
  }

}
