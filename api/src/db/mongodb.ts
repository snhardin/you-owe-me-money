import { MongoClient, Db } from 'mongodb';

class MongoDB {
    private _client: (MongoClient | null);
    private _db: (Db | null);

    public get db () {
        if (this._db) {
            return this._db;
        }

        throw new Error('mongodb.ts :: db :: Attempted to retrieve db before connection made');
    }

    constructor () {
        this._client = null;
        this._db = null;
    }

    public async connect (connStr: string) {
        this._client = await MongoClient.connect(connStr);
        console.log('mongodb.ts :: connect() :: Database successfully connected');
        this._db = this._client.db();
    }

    public async close () {
        if (this._client) {
            await this._client.close();
            this._client = null;
            this._db = null;
        } else {
            throw new Error('Client was not open');
        }
    }
}

export default new MongoDB();
