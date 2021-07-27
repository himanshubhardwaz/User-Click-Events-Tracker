import express, { json } from 'express';
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.text());

mongoose.connect('mongodb://localhost:27017/userclicks', { useNewUrlParser: true, useUnifiedTopology: true });

const userClicksSchema = {
    name: String,
    clicks: Number,
    type: String
}

const Userclick = mongoose.model('Userclick', userClicksSchema);

app.get("/", (req, res) => {
    res.send("Server running on PORT 5000")
})

app.get("/userclicks", (req, res) => {
    Userclick.find({}, function (err, foundData) {
        if (!err) {
            res.send(foundData)
        }
        else {
            res.send(err.message)
        }
    })
})

app.post("/userclicks", (req, res) => {
    const data = JSON.parse(req.body);

    data.forEach(element => {
        Userclick.findOne({ name: element.name }, function (err, foundItem) {
            console.log(element)
            if (foundItem) {
                console.log(foundItem)
                Userclick.update({ name: element.name },
                    { name: foundItem.name, clicks: foundItem.clicks + element.clicks, type: foundItem.type },
                    { overwrite: true },
                    function (error) {
                        console.log(error)
                    }
                )
            } else {
                const newData = new Userclick({
                    name: element.name,
                    clicks: element.clicks,
                    type: element.type,
                })
                newData.save(function (error) {
                    console.log(error)
                })
            }
            if (err) {
                console.log(err)
            }
        })
    })
})

app.listen(5000, () => {
    console.log("server running on port 5000")
})