export interface BalanceDocument {
    _id: string;
    balance: number;
}

export interface UserDocument {
    admin: boolean;
    email: string;
}
