import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('../../.env') });

const dbConfig = {
  development: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
  },
  production: {
    uri: process.env.MONGO_URI, 
  },
};

const env = process.env.NODE_ENV
console.log(env , dbConfig.development)


export default dbConfig