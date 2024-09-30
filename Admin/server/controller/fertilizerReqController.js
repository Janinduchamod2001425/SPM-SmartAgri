// warehouseController.js
import FertilizerReq from "../model/fertilizerReqModel.js";

// Create a new warehouse
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

// Get all warehouses
export const geFertilizerReqs = async (req, res) => {
    try {
        const fertilizerRequestses = await FertilizerReq.find();
        res.status(200).json({
            status: "success",
            results: fertilizerRequestses.length,
            data: fertilizerRequestses
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get a single warehouse by ID
export const getFertilizerReq = async (req, res) => {
    try {
        const fertilizer = await FertilizerReq.findById(req.params.id);
        if (!fertilizer) {
            return res.status(404).json({
                status: "fail",
                message: "Request not found"
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

// Delete a warehouse by ID
export const deleteFertilizerReq = async (req, res) => {
    try {
        const fertilizer = await FertilizerReq.findByIdAndDelete(req.params.id);
        if (!fertilizer) {
            return res.status(404).json({
                status: "fail",
                message: "Fertilizer not found"
            });
        }
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


