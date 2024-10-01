import FertilizerReq from "../model/fertilizerReqModel.js";
import nodemailer from 'nodemailer';  // Import nodemailer for sending emails

// Create a new fertilizer request
export const createFertilizerReq = async (req, res) => {
    try {
        const newFertilizerReq = new FertilizerReq(req.body);
        await newFertilizerReq.save();
        res.status(201).json({
            status: "success",
            data: newFertilizerReq
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get all fertilizer requests
export const geFertilizerReqs = async (req, res) => {
    try {
        const fertilizerRequests = await FertilizerReq.find();
        res.status(200).json({
            status: "success",
            results: fertilizerRequests.length,
            data: fertilizerRequests
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get a single fertilizer request by ID
export const getFertilizerReq = async (req, res) => {
    try {
        const fertilizer = await FertilizerReq.findById(req.params.id);
        if (!fertilizer) {
            return res.status(404).json({
                status: "fail",
                message: "Fertilizer request not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: fertilizer
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Delete a fertilizer request by ID and send an email to the user
export const deleteFertilizerReq = async (req, res) => {
    try {
        const fertilizer = await FertilizerReq.findByIdAndDelete(req.params.id);
        if (!fertilizer) {
            return res.status(404).json({
                status: "fail",
                message: "Fertilizer request not found"
            });
        }

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'duviduk@gmail.com', // Your email
                pass: 'dbjp rfke judp kxxf'  // Your email password or app-specific password
            }
        });

        // Set up email details
        const mailOptions = {
            from: 'duviduk@gmail.com', 
            to: fertilizer.email,
            subject: 'Fertilizer Request Rejected',
            text: `Dear Farmer,

Your fertilizer request has been deleted. Here are the details of your deleted request:
- Fertilizer Type: ${fertilizer.fertilizertype}
- Quantity: ${fertilizer.quantity}
- Priority Level: ${fertilizer.prioritylevel}
- Warehouse Name: ${fertilizer.warehousename}

Please contact us if you have any questions.

Best regards,
Fertilizer Management Team`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    status: "fail",
                    message: "Error sending email"
                });
            }
            console.log('Email sent: ' + info.response);
        });

        // Return success after deletion and email
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};
