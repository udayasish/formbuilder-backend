import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

app.use(express.static("public"))

app.use(cookieParser())

//Routes import
import formsRouter from "./routes/forms.routes.js"
import responsesRouter from "./routes/responses.routes.js"

//Routes declaration
app.use("/api/v1/forms", formsRouter)
app.use("/api/v1/responses", responsesRouter)

export { app }
