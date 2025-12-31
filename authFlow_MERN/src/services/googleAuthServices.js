const { OAuth2Client } = require("google-auth-library");
const AppError = require("../utils/AppError");
const userModel = require("../models/userModel");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const { generateAccessToken, generateRefreshToken } = require("../config/generateToken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthServices = async (req) => {

    const { credential } = req.body;
    if (!credential) throw new AppError(400, "Invalid Credentials");

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { name, email, email_verified } = payload;

    if (!email || !email_verified) {
        throw new AppError(400, "Google email not verified");
    }

    // ✅ unified user variable
    let user = await userModel.findOne({ email });

    if (!user) {
        user = await userModel.create({
            name,
            email,
            provider: "google"
        });
    }

    // device info
    const ua = req.headers["user-agent"] || "unknown";
    const parser = new UAParser(ua);
    const result = parser.getResult();

    const deviceId = crypto.randomUUID();

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

    user.refreshToken.push({
        token: refreshToken,
        device: {
            deviceId,
            browser: result.browser.name || "unknown",
            os: result.os.name || "unknown",
            ip: req.ip,
            userAgent: ua
        }
    });

    await user.save();

    return { user, accessToken, refreshToken };
};

module.exports = { googleAuthServices };
