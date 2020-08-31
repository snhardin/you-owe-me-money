import { Db, MongoClient } from 'mongodb';

/**
 * Class for managing mongo connection lifecycle.
 */
class MongoDB {
	private _client: (MongoClient | null);
	private _db: (Db | null);

	/**
	 * Get the mongo database object.
	 */
	public get db () {
		if (this._db) {
			return this._db;
		}

		throw new Error('mongodb.ts :: db :: Attempted to retrieve db before connection made');
	}

	/**
	 * Constructor for object
	 */
	constructor () {
		this._client = null;
		this._db = null;
	}

	/**
	 * Close the mongo database object.
	 */
	public async close () {
		if (this._client) {
			await this._client.close();
			this._client = null;
			this._db = null;
		} else {
			throw new Error('Client was not open');
		}
	}

	/**
	 * Connects to the MongoDb database.
	 * @param connStr Connection string to use to connect
	 */
	public async connect (connStr: string) {
		this._client = await MongoClient.connect(connStr);
		this._db = this._client.db();
	}
}

export default new MongoDB();
