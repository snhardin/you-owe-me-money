import mongodb from '../db/mongodb';

/**
 * Name of the collection to find user balances
 */
const BALANCES_COLLECTION = 'balances';

/**
 * Name of the collection to find user definitions
 */
const USERS_COLLECTION = 'users';

/**
 * Structure expected of document in balances collection
 */
interface BalanceDocument {

	/**
	 * ID (the user's email)
	 */
	_id: string;

	/**
	 * Balance remaining
	 */
	balance: number;
}

/**
 * Structure expected of document in users collection
 */
interface UserDocument {

	/**
	 * Whether or not the user is an admin
	 */
	admin: boolean;

	/**
	 * The email associated with the user
	 */
	email: string;
}

/**
 * Finds the balance of a particular email
 * @param email The email to find the balance of
 * @returns The Mongo db query result
 */
export function findBalance (email: string) {
	return mongodb.db.collection(BALANCES_COLLECTION).findOne<BalanceDocument>({ _id: email });
}

/**
 * Finds the user of a particular email
 * @param email The email to find the user of
 * @returns The Mongo db query result
 */
export function findUser (email: string) {
	return mongodb.db.collection(USERS_COLLECTION).findOne<UserDocument>({ email });
}
