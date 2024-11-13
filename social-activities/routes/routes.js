const express = require("express");
const app = express();

const validateRequest = require('./../middleware/validate_token')
const activity = require('./../controllers/activity')

app.patch("/likes", validateRequest.validate, (req, res) => {
    activity.likeDiscussion(req, res)
})
app.patch("/views", validateRequest.validate, (req, res) => {
    activity.viewCountDiscussion(req, res)
})
app.patch("/follow", validateRequest.validate, (req, res) => {
    activity.followUser(req, res)
})

module.exports = app