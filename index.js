const express = require('express')
const app = express()

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded());
const Message = require("./models/messages");
const connectDB = require('./config/db');

connectDB();


app.get('/', (req, res) => {
    res.sendFile("pages/index.html", { root: __dirname });
})


app.post('/getMessages', async (req, res) => {
    let messages = await Message.find({});
    res.status(200).send({ success: true, messages });
})

app.post('/addMessage', async (req, res) => {
    let message = await Message.create(req.body);
    res.status(200).json({ success: true, message });
})

app.post('/deleteMessage', async (req, res) => {
    const deletedMessage = await Message.deleteOne({ username: req.body.username});
    res.status(200).send({ success: true, deletedMessage});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})