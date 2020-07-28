import mongodb from '../db/mongodb';
import { UserDocument, BalanceDocument } from '../db/mongodb.interface';

export async function findBalance (email: string) {
    return await mongodb.db.collection('balances').findOne<BalanceDocument>({ _id: email });
}

export async function findUser (email: string) {
    return await mongodb.db.collection('users').findOne<UserDocument>({ _id: email });
}
