export interface APITransaction {
    message:   string;
    transfers: Transfer[];
}

export interface Transfer {
    value:    number;
    date:     Date | string;
    currency: string;
    payeer:   Payeer;
}

export interface Payeer {
    document: string;
    name:     string;
}