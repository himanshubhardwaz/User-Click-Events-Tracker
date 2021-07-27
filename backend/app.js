import express, { json } from 'express';
import mongoose from "mongoose";


const app = express();

app.use(express.json());
app.use(express.text());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const userClicksSchema = {
    name: String,
    clicks: Number,
    type: String
}

const userClicks = mongoose.model('click', userClicksSchema);

app.get("/", (req, res) => {
    res.send("Server running on PORT 5000")
})

app.post("/userclicks", (req, res) => {
    try {
        console.log(req.body)
        res.send("success")
    } catch (error) {
        res.error(error)
    }

})

app.listen(5000, () => {
    console.log("server running on port 5000")
})