import mongoose from 'mongoose'

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string
}

export class MongoDatabase {
    constructor() {

    }
    static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            });
            console.log('MongoDB success connection');
            return true
        } catch (error) {
            console.log('Mongo connection error');
            return false
        }
    }
}