// warehouseController.js
import Warehouse from "../model/warehouseModel.js";

// Create a new warehouse
export const createWarehouse = async (req, res) => {
    try {
        const newWarehouse = new Warehouse(req.body);
        await newWarehouse.save();
        res.status(201).json({
            status: "success",
            data: newWarehouse
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get all warehouses
export const getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json({
            status: "success",
            results: warehouses.length,
            data: warehouses
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get a single warehouse by ID
export const getWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({
                status: "fail",
                message: "Warehouse not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: warehouse
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Delete a warehouse by ID
export const deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!warehouse) {
            return res.status(404).json({
                status: "fail",
                message: "Warehouse not found"
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


// Update a warehouse by ID
export const updateWarehouse = async (req, res) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedWarehouse) {
            return res.status(404).json({
                status: "fail",
                message: "Warehouse not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: updatedWarehouse
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};