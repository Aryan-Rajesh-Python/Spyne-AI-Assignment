const user = require('./../models/user')
const discussion = require('./../models/discussion')
const mongoose = require('mongoose')
const { validatelikeDiscussionSchema, validateviewCountDiscussionSchema,
    validatefollowUserSchema, validateCommentSchema } = require('./validation')

class Activity {
    async likeDiscussion(req, res) {
        const { error } = validatelikeDiscussionSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { action, postId } = req.body
        const userId = req.user.user_id;
        const postDetails = await discussion.findOne({ "postId": postId }, { "likes": 1, "_id": 0, "postId": 1 })
        if (!postDetails) {
            return res.status(400).send({
                "message": "post id is invalid"
            })
        }
        if (action == 'like') {
            var post_liked = false
            postDetails.likes.forEach((element) => {
                if (element.userId == userId) {
                    post_liked = true
                }
            })
            //this will take O(N), but can be optimised using creating indexes on DB or by using $exists function of Mongo itself, thats not covered due to time constraints
            if (post_liked) {
                return res.status(401).json({
                    "status": false,
                    "message": "already liked"
                })
            }
            const discussion_updated = await discussion.updateOne(
                { postId: postId },
                { $push: { likes: { userId: userId } } }
            );

            return res.json({
                status: 'success',
                message: 'Liked the discussion post successfully',
                data: discussion_updated,
            });
        }
        else {
            const discussion_updated = await discussion.updateOne(
                { postId: postId },
                { $pull: { likes: { userId: userId } } }
            );
            return res.json({
                status: 'success',
                message: 'Disliked the discussion post successfully',
                data: discussion_updated,
            });
        }

    }
    async viewCountDiscussion(req, res) {
        const { error } = validateviewCountDiscussionSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { postId } = req.body;
        console.log(postId);
        const postDetails = await discussion.findOne({ "postId": postId }, { "viewCount": 1, "_id": 0, "postId": 1 })
        var post_viewed = false;
        const userId = req.user.user_id;
        if (postDetails && postDetails.viewCount.length > 0) {
            postDetails.viewCount.forEach((element) => {
                if (element.userId == userId) {
                    post_viewed = true
                }
            })
            //this will take O(N), but can be optimised using creating indexes on DB or by using $exists function of Mongo itself, thats not covered due to time constraints
        }
        if (post_viewed) {
            return res.status(400).json({
                "status": false,
                "message": "already viewed"
            })
        }
        try {
            const post_viewed = await discussion.updateOne(
                { postId: postId },
                { $push: { viewCount: { userId: userId } } }
            );
            return res.json({
                status: 'success',
                message: 'Viewed the discussion post successfully',
                data: post_viewed,
            })
        } catch (error) {
            return res.status(400).json({
                "error": error
            })
        }
    }
    async followUser(req, res) {
        const { error } = validatefollowUserSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { userId } = req.body
        const curr_user_id = req.user.user_id
        console.log(curr_user_id);
        console.log(userId);
        const userData = await user.findOne({ "userId": userId }, { "followers": 1, "following": 1 })
        if (!userData) {
            return res.status(400).json({
                "status": false,
                "message": "userId is wrong"
            })
        }
        var user_followed = false
        if (userData.following && userData.following.length > 0) {
            userData.following.forEach((element) => {
                if (element.userId == userId) {
                    user_followed = true
                }
            })
            //this will take O(N), but can be optimised using creating indexes on DB or by using $exists function of Mongo itself, thats not covered due to time constraints

        }
        if (!user_followed) {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const curr_following = await user.updateOne(
                    { userId: curr_user_id },
                    { $push: { following: { userId: userId } } },
                    { session }
                );
                const user_followed = await user.updateOne(
                    { userId: userId },
                    { $push: { followers: { userId: userId } } },
                    { session }
                );
                await session.commitTransaction();
                return res.json({
                    status: 'success',
                    message: 'updated following'
                })


            } catch (error) {
                console.log(error);
                await session.abortTransaction();
                return res.status(400).json({
                    "error": error
                })
            }

        }
        else {
            return res.status(400).json({ "status": false, "message": "user is already followed" })
        }


    }
    async comment(req, res) {
        const { error } = validateCommentSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
    }
}

module.exports = new Activity()