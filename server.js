require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
// const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.get('/', (req, res) => {
    res.send({
        "message": "ok"
    })
})
// app.use('/api/posts', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
