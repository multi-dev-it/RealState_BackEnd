import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const mailHost = process.env.MAIL_HOST
const mailUser = process.env.MAIL_USER
const mailPassword = process.env.MAIL_PASSWORD

export { serverPort, dbUrl, mailHost, mailUser, mailPassword }
