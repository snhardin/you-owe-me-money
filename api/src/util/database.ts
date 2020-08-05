import mongodb from '../db/mongodb';

const BALANCES_COLLECTION = 'balances';
const USERS_COLLECTION = 'users';

interface BalanceDocument {
    _id: string;
    balance: number;
}

interface UserDocument {
    admin: boolean;
    email: string;
}

export function findBalance (email: string) {
    return mongodb.db.collection(BALANCES_COLLECTION).findOne<BalanceDocument>({ _id: email });
}

export function findUser (email: string) {
    return mongodb.db.collection(USERS_COLLECTION).findOne<UserDocument>({ email });
}
