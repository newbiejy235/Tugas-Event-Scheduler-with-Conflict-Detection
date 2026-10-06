import express from "express"
import events from "./routes/events.routes"
const app = express()
const PORT = 5000

app.use(express.json())

app.use("/events", events)

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`server jalan di localhost : ${"http://localhost:5000"} `);
    
})