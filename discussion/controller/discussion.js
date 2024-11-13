const discussion_schema = require('./../models/discussion')
const { validateDiscussionSchema } = require('./../controller/validation')

class DiscussionController {
    async postDiscussion(req, res) {
        const { error } = validateDiscussionSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const discussion = new discussion_schema(
            { ...req.body, "userId": req.user.user_id }
        );
        try {
            const data = await discussion.save();
            return res.json({
                status: "success",
                message: "discussion registered sucessfully",
                data,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ "errorMessage": error });
        }

    }
    async updateDiscussion(req, res) {
        const { error } = validateDiscussionSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({
                "message": "please provide a post id"
            })
        }

        try {
            const updatedDiscussion = await discussion_schema.findOneAndUpdate(
                { userId: req.user.user_id, postId: postId },
                { ...req.body },
                { new: true }
            );

            if (!updatedDiscussion) {
                return res.status(404).json({ message: "Discussion not found" });
            }

            return res.json({
                status: "success",
                message: "Discussion updated successfully",
                data: updatedDiscussion,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ errorMessage: error });
        }
    }
    async deletePost(req, res) {
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({
                "message": "please provide a post id"
            })
        }
        try {
            const delete_discussion = await discussion_schema.deleteOne({ 'userId': req.user.user_id, 'postId': postId })
            if (!delete_discussion) {
                return res.status(404).json({ message: 'Post not found or not authorized to delete this post' });
            }

            return res.json({
                status: 'success',
                message: 'Post deleted successfully',
                data: delete_discussion,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ errorMessage: err });
        }
    }
}

module.exports = new DiscussionController();