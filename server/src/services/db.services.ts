import { Problem } from '@/models/problem.model'
import { User } from '@/models/user.model'
import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'

// Load the environment variables from .env file
config()

if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME) {
  throw new Error('MONGODB credentials are not defined')
}
class DBService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI as string)
    // DB name
    this.db = this.client.db(process.env.MONGODB_NAME as string)
  }
  // Connect to the MongoDB database
  async connectToDB() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.error('Could not connect to MongoDB. Exiting now...')
      process.exit(1)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.USERS_COLLECTION || '')
  }

  get problems(): Collection<Problem> {
    return this.db.collection(process.env.PROBLEMS_COLLECTION || '')
  }
}

const dbService = new DBService()
export default dbService
