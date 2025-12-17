import express from 'express'
import contactRouter from './routes/contact.routes.js'

const app = express()

//CONFIG
app.use(express.json())

//ROUTES
app.use('/contacts', contactRouter)


export default app