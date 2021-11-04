import { Component, HostListener, OnInit } from "@angular/core";

const calculateFCLAge = () => {
    let chartered = new Date(1867, 10, 16);
    let diff = Math.abs(Date.now() - chartered.getTime());
    let age = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    let today = new Date();
    if((today.getMonth() > 9) || (today.getMonth() == 9 && today.getDate() >= 16)) {
        age += 1;
    }
    return age;
};

interface EventOptions {
    year: any,
    content: string,
    imageSrc: string,
    imageCaption: string,
    altText: string
}

const events: EventOptions[] = [
    {
        year: 1867,
        content: `
            Two years following the tragic death of President Abraham Lincoln, after being sponsored by Bigelow Lodge No. 243,
            a dispensation was granted by Grand Master Thomas Sparrow on March 28th, 1867.
            Two days later, Forest City Lodge U.D. held its first meeting in the Masonic Hall on Franklin Street, and adopted a code of By-Laws.
            Following a charter being granted on October 16th, 1867 by the Grand Lodge of Ohio at its Cincinnati meeting,
            Worshipful Brother Elisha T. Ellsworth, a bookkeeper, and a Past Master of Meridian Sun Lodge No. 226, was the first elected and installed Master of Forest City Lodge.
        `,
        imageSrc: "../../../assets/images/franklin-blvd-masonic-temple.jpg",
        imageCaption: "The Masonic Hall on Franklin Street",
        altText: ""
    },
    {
        year: 1873,
        content: `
        As Cleveland grew and changed, so did its members change and relocate about the city.
        In time, the number of East Side members was so predominant that a vote was held in November of 1873,
        which resulted in the meeting place being moved to Case Hall, located at East 3rd Street and Superior Avenue.
        This location remained our home for almost a quarter of a century.
        `,
        imageSrc: "../../../assets/images/case_hall.jpg",
        imageCaption: "Case Hall, early 1900s. Western Reserve Historical Society",
        altText: ""
    },
    {
        year: 1896,
        content: `
        In 1896, Forest City Lodge, with other centrally located Masonic bodies, moved into the Masonic Temple on East 6th Street and Superior Avenue.
        This is where we remained until the site was sold to make way for the new Federal Reserve Bank of Cleveland building.
        For seven months thereafter, we met at the Newburgh Masonic Temple.
        `,
        imageSrc: "../../../assets/images/newburgh.jpg",
        imageCaption: "Newburgh Masonic Temple, 2019. Abandoned since 1984",
        altText: ""
    },
    {
        year: 1921,
        content: `
        On September 1st, 1921, the new Masonic Temple at East 36th Street and Euclid Avenue was completed, and it became our new home.
        Here we remained through the terrible depression years. During this period of Forest City Lodge history, a glimpse of the true character of the Lodge came to light.
        The depression inflicted heavy financial losses upon many of our members, and many would have been suspended for non-payment of dues.
        The Brethren of Forest City Lodge demonstrated their Masonic Charity, and all worthy, distressed members during those years, and right up to the present time, were kept in good standing.
        `,
        imageSrc: "../../../assets/images/cleveland_masonic_temple.jpg",
        imageCaption: "Cleveland Masonic Temple",
        altText: ""
    },
    {
        year: 1942,
        content: `
        On October 16th, 1942, Worshipful Master Julius A. Negin called a special meeting of the Lodge for the purpose of celebrating the 75th Anniversary of Forest City Lodge.
        Wor. Bro. Negin later became the Chairman of the first blood bank established by any Masonic Lodge in the state of Ohio.
        `,
        imageSrc: "../../../assets/images/timecapsule.jpg",
        imageCaption: "Julius Negin's grandchildren open time capsule",
        altText: ""
    },
    {
        year: 1955,
        content: `
        In October of 1955, Forest City Lodge, together with Golden Square Lodge, purchased land at the corner of Warrensville Center and Farnsleigh Roads in Shaker Heights for the purpose of constructing a new Masonic Temple.
        Ground breaking ceremonies were held on February 12th, 1958.
        `,
        imageSrc: "../../../assets/images/groundbreaking.jpg",
        imageCaption: "Newspaper article on groundbreaking",
        altText: ""
    },
    {
        year: 1958,
        content: `
        Grand Master Andrew J. White, Jr. laid the cornerstone of our magnificent Temple on June 8th, 1958.
        The official dedication was conducted on February 28th, 1959.
        The first regular meeting held in our new home was the installation of officers on January 14th, 1959.
        `,
        imageSrc: "../../../assets/images/cornerstone.jpg",
        imageCaption: "Cornerstone of the Shaker Masonic Temple",
        altText: ""
    },
    {
        year: 1966,
        content: `
        After paying its share of the cost of the new building, Forest City Lodge found itself with an excess of Building Fund contributions.
        In 1966, the Brethren voted to use these funds for Masonic Charity.
        As a direct result of this decision, two rooms in the Ohio Masonic Home in Springfield were completely furnished by the Lodge.
        `,
        imageSrc: "../../../assets/images/ohio-masonic-home.jpg",
        imageCaption: "Ohio Masonic Home, Springfield",
        altText: ""
    },
    {
        year: 1973,
        content: `
        To underscore the true meaning of the religious season, around Christmas and Hanukkah, Forest City Lodge holds an annual Brotherhood Night.
        This event was started in December of 1973 by Worshipful Brother Bert M. Tobin, 33°.
        This event has received statewide recognition.
        `,
        imageSrc: "../../../assets/images/brotherhood-night.jpg",
        imageCaption: "45th Annual Brotherhood Night, Candle Lighting Ceremony",
        altText: "Discovery Photo"
    },
    {
        year: 1979,
        content: `
        Since June 1979, the annual observance of Table Lodge has been our final meeting before spring break.
        Inspired messages from noteworthy Masons and a generous outpouring from the "Box of Fraternal Assistance" has enriched many worthwhile charities and made this an evening of good fellowship enjoyed by all.
        `,
        imageSrc: "../../../assets/images/minutes.jpg",
        imageCaption: "Forest City Lodge attendance book",
        altText: "Discovery Photo"
    },
    {
        year: 1986,
        content: `
        On April 1st, 1986, Golden Square Lodge No. 679, chartered in 1922, consolidated its 356 members with the 800 members of Forest City Lodge, and returned their charter to the Grand Lodge of Ohio.
        `,
        imageSrc: "../../../assets/images/golden-square.jpg",
        imageCaption: "Golden Square Lodge Gavels",
        altText: "Discovery Photo"
    },
    {
        year: 1999,
        content: `
        With the merger of Golden Square, Forest City Lodge became the owner of 75% of the shares of the Shaker Masonic Temple.
        Lodge consolidations and the movement of tenants to other Masonic facilities had the Shaker Masonic Temple looking for other tenants.
        Unity Church became a prime tenant, but this income was not sufficient to lessen the financial burden that Forest City had to bear as the majority owner.
        In 1999, Unity Church approached the building association about buying the facility.
        After lengthy negotiations, the sale was approved and Forest City Lodge moved as a tenant to the Lyndhurst Masonic Center, located at 5516 Mayfield Road, Lyndhurst, Ohio 44124.
        `,
        imageSrc: "../../../assets/images/alter.jpg",
        imageCaption: "Lodge Room Altar, Lyndhurst Masonic Temple",
        altText: "Discovery Photo"
    },
    {
        year: 2018,
        content: `
        During the Sesquicentennial Celebration, WB Tim Cline called a special meeting to celebrate not only Forest City Lodge's 150 years in operation,
        but to open the time capsule WB Julius A. Negin had placed behind the cornerstone of the Shaker Masonic Temple.
        The time capsule and cornerstone were recovered during the demolition of the temple building earlier that year.
        `,
        imageSrc: "../../../assets/images/sesquicentennial.jpg",
        imageCaption: "2018 Grand Lodge Officers and Brethren of Forest City Lodge assemble for Forest City Lodge's 150th Reconsecration Ceremony",
        altText: ""
    },
    {
        year: 2020,
        content: `
        In response to the COVID-19 Pandemic Outbreak, the Grand Master granted dispensations to all
        lodges in Ohio to hold stated meetings, without ritual work, over video conference applications.
        On April 15, 2020, Forest City Lodge No. 388 opened its first-ever virtual stated meeting.
        At various points during the meeting, more than 40 brethren in five states joined the call.
        `,
        imageSrc: "../../../assets/images/zoom.jpg",
        imageCaption: "First Zoom meeting",
        altText: ""
    },
    {
        year: 'Today',
        content: `
        Forest City Lodge is now over ${calculateFCLAge()} years old and remains a vibrant, active, and flourishing Lodge that has weathered the good times and the bad.
        With your Masonic efforts, we will prosper far into the 21st century and beyond.
        `,
        imageSrc: "../../../assets/images/working-tools.jpg",
        imageCaption: "Forest City Lodge working tools",
        altText: "Discovery Photo"
    },
];

@Component({
    selector: 'our-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    events: EventOptions[] = [];

    ngOnInit() {
        this.events = events;
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
