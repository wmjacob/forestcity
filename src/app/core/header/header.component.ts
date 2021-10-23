import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', []) onScroll() {
        let navbar = document.getElementById('mainNavbar') as HTMLElement;
        const offset = 99;
        if (window.pageYOffset >= offset) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }

    goToHome() {
        this.router.navigate(['home']);
    }

}
