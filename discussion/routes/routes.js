const express = require("express");
const app = express();

const discussionController = require('./../controller/discussion')
const validateRequest = require('./../middleware/validate_token')

app.post("/discussion", validateRequest.validate, (req, res) => {
    discussionController.postDiscussion(req, res)
})
app.patch("/discussion", validateRequest.validate, (req, res) => {
    discussionController.updateDiscussion(req, res)
})
app.delete("/discussion", validateRequest.validate, (req, res) => {
    discussionController.deletePost(req, res)
})


module.exports = app