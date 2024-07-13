import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, 
    },
   
});

const OtpModel = mongoose.model("otp", otpVerificationSchema);
export { OtpModel as OTP };
