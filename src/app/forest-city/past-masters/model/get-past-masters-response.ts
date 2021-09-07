export class GetPastMastersResponse {
    pastMastersList: PastMaster[] = [];
}

export interface PastMaster {
    number: number;
    name: string;
    term: string;
}
