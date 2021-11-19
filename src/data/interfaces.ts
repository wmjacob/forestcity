export interface Bulletin {
    // filename of pdf in in src/assets/pdf
    // eg 'current-bulletin.pdf'
    filename: string,
};

export interface EventOptions {
    date: string,
    name: string,
    description: string,
    location: string,
    address: string,
    addressLink: string,
    rsvpOptions: object | boolean,
    rsvpExpirationDays: string,
    spotlight: boolean,
    spotlightImage: string,
    altText: string,
    tyled: boolean,
    earlyBirdOptions: object
};
