require('dotenv').config();
require('./db/db.js');
const express = require('express');
const app = express();
const cors = require('cors');
const discussion_routes = require('./routes/routes')
app.use(express.json());
app.get('/', (req, res) => {
    res.send({
        "message": "ok"
    })
})
app.post('/ok', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})
app.use("/api", discussion_routes)

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
