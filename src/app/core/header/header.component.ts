import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    fclAge: number = 0;
    isAuthenticated: boolean = true;
    tabOne: string = '#navSectionOne';
    tabTwo: string = '#navSectionTwo';
    @ViewChild('navSectionOne') navSectionOne ? : ElementRef;
    @ViewChild('navSectionTwo') navSectionTwo ? : ElementRef;

    constructor(private element: ElementRef,
                private router: Router,
                private route: ActivatedRoute,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.calculateFCLAge();
    }

    ngAfterViewInit() {
        
    }

    private calculateFCLAge() {
        let chartered = new Date(1867, 10, 16);
        let diff = Math.abs(Date.now() - chartered.getTime());
        this.fclAge = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    }

    goToHome() {
        this.router.navigate(['home']);
    }

}