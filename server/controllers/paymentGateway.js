/*eslint-disable */
import axios from "axios";
import dotenv from "dotenv";
import { Donation } from "../models/donation";

dotenv.config();


const header = {
    headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`
    },
};


export default class PaymentGateway {

    /**
     * `initiatePayment` initiates a payment transaction using data from the request query
     * and returns a checkout URL in the response.
     */
    static async initiatePayment(req, res) {
        const { amount, email, first_name, last_name, currency} = req.query.query
        const tx_ref = "tx-eavo-donation-" + Date.now();
        const data = { amount, email, first_name, last_name, currency, tx_ref};

        await axios
            .post(CHAPA_INITIATE_URL, data, header)
            .then((response) => {
                return res.status(200).json({
                    checkout_url: response.data.data.checkout_url
                })
            })
            .catch((err) => {
                return res.status(400);
            })
    }

    /**
     *  `verifyPayment` asynchronously verifies a payment transaction using an external API
     * and saves the transaction details to a database.
     */
    static async verifyPayment(req, res) {
        const tx_ref = req.params.tx_ref;
        await axios
            .get(`${CHAPA_VERIFY_URL}/${tx_ref}`, header)
            .then(async (response) => {
                if (response.data.data.status == "success") {
                    const {email, amount, currency, tx_ref} = response.data.data;
                    const newDonation = new Donation({
                        email,
                        amount,
                        currency,
                        tx_ref
                    })
                    await newDonation.save()
                    return res.status(200).json({status: "success"});
                } else if (response.data.data.status == "pending") {
                    return res.status(200).json({status: "pending"});
                }
                return res.status(200).json({status: "failed"});
            })
            .catch((err) => {
                return res.status(400);  
            })
    }

}