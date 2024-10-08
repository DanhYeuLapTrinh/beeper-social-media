import { TopicTag } from '@/models/base.model'
import { DBQuestion } from '@/models/question.model'
import { User } from '@/models/user.model'
import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'

// Load the environment variables from .env file
config()

if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME) {
  throw new Error('MONGODB credentials are not defined')
}
class DBServices {
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
      console.log('You successfully connected to MongoDB!')
    } catch {
      console.error('Could not connect to MongoDB. Exiting now...')
      process.exit(1)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.USERS_COLLECTION || '')
  }

  get questions(): Collection<DBQuestion> {
    return this.db.collection(process.env.QUESTIONS_COLLECTION || '')
  }
  get topicTags(): Collection<TopicTag> {
    return this.db.collection(process.env.TOPIC_TAGS_COLLECTION || '')
  }
}

const dbServices = new DBServices()
export default dbServices
