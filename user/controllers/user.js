const { validateRegisterUser, validateLoginUser } = require('./validator')
const jwt = require("jsonwebtoken");
const userSchema = require('./../models/user')
const bcrypt = require('bcryptjs')
const constants = require('./../util/util.constant')
const { ingest_elasticsearch } = require('./../util/elasticsearch')

class UserController {
    async register(req, res) {
        const { error } = validateRegisterUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const plain_text_password = req.body.password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(plain_text_password, salt);
        const user = new userSchema(
            { ...req.body, "password": hashedPassword }
        );
        const elastic_payload = {
            "email": req.body.email,
            "name": req.body.name
        }
        try {
            const data = await user.save();
            ingest_elasticsearch(elastic_payload)
            return res.json({
                status: "success",
                message: "user registered sucessfully",
                data,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ "errorMessage": error });
        }

    }

    async login(req, res) {
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        var data = await userSchema.find({ email: req.body.email });
        if (data.length == 0) {
            return res.status(400).json({ "message": "email id is wrong" })
        }
        var correct_password = await bcrypt.compare(req.body.password, data[0].password);
        if (correct_password) {
            var token = jwt.sign(
                {
                    user_id: data[0].userId
                },
                constants.jwt_secret,
                { expiresIn: '12h' }
            )
            return res.json({ "token": token })
        }
        else {
            return res.status(400).json({
                status: "failure",
                message: `invalid password, please try again`,
            });
        }
    }
}

module.exports = new UserController();