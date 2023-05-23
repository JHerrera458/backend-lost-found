import { MongoClient, ObjectId } from "mongodb";

export class MongoService {
    private connectionString: string
    private database: string
    constructor() {
        this.connectionString = "mongodb+srv://JHerrera458:NMRmPJptvUcZ63uL@jherrera458.ddqobzx.mongodb.net/apiLostFound"
        this.database = "apiLostFound"
    }

    connectionDb() {
        const client = new MongoClient(this.connectionString)
        return client
    }

    async getItems(collectionName: string) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const items = await collection.find().toArray()
            return items
        } finally {
            await client.close()
        }
    }

    async insertItem(collectionName: string, payload: object) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const response = await collection.insertOne(payload)
            return response
        } finally {
            await client.close()
        }
    }

    async updateItem(collectionName: string, payload: object, id: string) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const itemId = new ObjectId(id)
            const response = await collection.replaceOne({ _id: itemId }, payload)
            return response
        } finally {
            await client.close()
        }
    }

    async deleteItem(collectionName: string, id: string) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const itemId = new ObjectId(id)
            const response = await collection.deleteOne({ _id: itemId })
            return response
        } finally {
            await client.close()
        }
    }
}