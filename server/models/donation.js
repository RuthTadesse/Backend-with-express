import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['ETB', 'USD']
    },
    tx_ref: {
        type: String,
        required: true
    }
});

const DonationModel = mongoose.model("donation", donationSchema);
export { DonationModel as Donation }