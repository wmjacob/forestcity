import { Component, OnInit } from "@angular/core";

interface BrotherhoodEvents {
    content: string,
    imageSrc: string,
    imageCaption: string,
    altText: string
}

const events: BrotherhoodEvents[] = [
    {
        content: `One of the proudest traditions at Forest City Lodge No. 388 is our annual Brotherhood
        Night: A Night with the Clergy and Candle Lighting Ceremony. For more than half a century,
        Lodge members, guests, and others from the community celebrate the shared values of giving
        back that transcend across different religions. The event includes speakers from different
        religious backgrounds and recognizes local charitable organizations for the differences they
        make in the Northeast Ohio community.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    },
    {
        content: `A Night with the Clergy first began in October of 1972. Forest City Lodge invited the
        Grand Chaplain of Free &amp; Accepted Masons in Ohio, Right Worshipful Brother Morris Alton,
        and Rabbi Rudolph M. Rosenthal of Temple on the Heights (now known as B'nai Jeshurun) to
        speak on the topic of Brotherhood. Following his speech, Reverend Alton presented Forest City
        Lodge with a special three-wicked candle, and requested it be lit during the winter holiday
        season.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    },
    {
        content: `The candle is still lit annually during the Brotherhood Night event in the spirit of
        Brotherhood and fellowship. The three wicks allude to the three principal rungs of Jacob's
        ladder: Faith, Hope, and Charity. They are lit by the Junior Warden, Senior Warden, and
        Worshipful Master, who together represent the beauty of charity, the strength to aid those in
        need, and the wisdom to both spread the Masonic tenets of “Brotherly Love, Relief, and Truth,”
        and to know the importance of faith, both within the Fraternity and in our own lives.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    },
    {
        content: `In 1985, a charitable piece was added to Brotherhood Night. Worshipful Brother Lewis J.
        Fine and Brother Bernard B. Kaufman proposed the creation of the Forest City Lodge
        Brotherhood Fund. Brother Kaufman's sons, Worshipful Brother Jay F. Kaufman and Brother
        David H. Kaufman, took over for their father as chairman and co-chair, respectively, of the
        Brotherhood Night event and in overseeing the Brotherhood Fund for 25 years until their
        retirements from the position following the 50th annual event in 2023.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    },
    {
        content: `Throughout the year, brothers and guests donate to the Brotherhood Fund. At
        Brotherhood Night, the money raised is donated to several different charities. All organizations
        recognized during the event are in Northeast Ohio, with a focus on relieving at least one of three
        immediate needs: shelter, food, and clothing. There is no endowment, which means each year's
        fund starts from empty. If you would like to donate, please fill out the contact form on our
        website.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    },
    {
        content: `Brotherhood Night: A Night with the Clergy and Candle Lighting Ceremony is typically
        held in December at Forest City Lodge. It is an event open to everyone, regardless of faith, and
        you do not have to be a Mason to join us. Guests are welcome, and there is no cost to attend the
        Brotherhood Night event and Candle Lighting Ceremony. We hope to see you there, as we work
        to keep this longstanding tradition alive for decades to come.`,
        imageSrc: "",
        imageCaption: "",
        altText: ""
    }
]

@Component({
    selector: 'brotherhood-night-history',
    templateUrl: './brotherhood-night-history.component.html',
    styleUrls: ['./brotherhood-night-history.component.scss']
})
export class BrotherhoodNightHistoryComponent implements OnInit {
    events: BrotherhoodEvents[] = [];

    ngOnInit(): void {
        this.events = events;
    }

}
