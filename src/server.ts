import dotenv from 'dotenv'
import { app } from './app'

dotenv.config({ path: `.env` })

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

process.on('unhandledRejection', (err: { name: string; message: string }) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
