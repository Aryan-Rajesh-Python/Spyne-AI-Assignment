const app = require("express")();
const jwt = require("jsonwebtoken");
const { jwt_secret } = require('./../util/util.constant');

class validateRequests {
    async validate(req, res, next) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwt_secret, (err, user) => {
                if (err) {
                    return res.json({
                        status: "failure",
                        message: "invalid token",
                    });
                } else {
                    const decoded_token = jwt.decode(token, jwt_secret);
                    var cur_time = Math.round(Date.now() / 1000);
                    if (cur_time >= decoded_token.exp) {
                        res.json({
                            status: "failure",
                            message:
                                "token expired, please login again to generate a new token",
                        });
                    } else {
                        req.user = decoded_token;
                        next();
                    }
                }
            });
        } else {
            res.json({
                status: "failure",
                message: "please provide an auth token",
            });
        }

    }
}

module.exports = new validateRequests();