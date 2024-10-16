import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const mailHost = process.env.MAIL_HOST
const mailUser = process.env.MAIL_USER
const mailPassword = process.env.MAIL_PASSWORD

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE

const apiBaseUrl = process.env.API_BASE_URL

export {
  serverPort,
  dbUrl,
  mailHost,
  mailUser,
  mailPassword,
  accessTokenSecret,
  accessTokenExpire,
  apiBaseUrl,
}
