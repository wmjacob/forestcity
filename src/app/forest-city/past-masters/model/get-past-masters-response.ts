export class GetPastMastersResponse {
    pastMastersList!: PastMaster[];
}

export class PastMaster {
    number!: number;
    name!: string;
    term!: string;
}