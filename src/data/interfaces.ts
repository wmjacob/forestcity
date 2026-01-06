export interface Bulletin {
    // filename of pdf in in src/assets/pdf
    // eg 'current-bulletin.pdf'
    filename: string,
};

export interface EventOptions {
    date: string,
    name: string,
    description: string,
    extraInfo: string,
    location: string,
    address: string,
    addressLink: string,
    rsvpOptions: object | boolean,
    rsvpExpirationDays: string,
    rsvpExpirationTime: string,
    spotlight: boolean,
    spotlightImage: string,
    altText: string,
    tyled: boolean,
    earlyBirdOptions: object,
    rsvpLimit: boolean
};

export interface RecentEvent {
    eventName: string,
    eventId: string,
    displayDate: string,
    description: string,
    albumName: string,
    imageUrls: any,
    slideLabels: any,
    slideContent: any,
    eventDate: string
}

export interface PastBulletin {
    year: string,
    displayName: string,
    filename: string
}

export interface PhotoAlbum {
    albumName: string,
    title: string,
    subtitle: string,
    description: string
}

export interface MitzvahEvent {
    name: string,
    date: string,
    location: string,
    locationAddress: string,
    locationUrl: string,
    description: string,
    eventImageUrl: string,
    isRsvpBtn: boolean,
    isRsvpDesc: boolean,
    rsvpDesc: string
}

export interface SocialEvent {
    name: string,
    date: string,
    location: string,
    locationAddress: string,
    locationUrl: string,
    description: string
    eventImageUrl: string,
    isRsvpBtn: boolean,
}
