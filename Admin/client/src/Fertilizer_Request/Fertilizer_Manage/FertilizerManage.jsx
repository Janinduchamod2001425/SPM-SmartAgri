import React, { useEffect, useState } from 'react';
import "./FertilizerManage.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FertilizerMng = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [fertilizerReqs, setFertilizerReqs] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const warehouseResponse = await axios.get("http://localhost:8000/api/getWarehouses");
                const fertilizerReqResponse = await axios.get("http://localhost:8000/api/geFertilizerReqs");

                setWarehouses(warehouseResponse.data.data);
                setFertilizerReqs(fertilizerReqResponse.data.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const getRequestCountForWarehouse = (warehouseName) => {
        return fertilizerReqs.filter(req => req.warehousename === warehouseName).length;
    };

    const getTotalQuantityForWarehouse = (warehouseName) => {
        return fertilizerReqs
            .filter(req => req.warehousename === warehouseName)
            .reduce((total, req) => total + req.quantity, 0);
    };

    // Navigate to FertilizerManageEach page with the specific warehouse data, request count, and total quantity
    const handleRowClick = (warehouse) => {
        const requestCount = getRequestCountForWarehouse(warehouse.warehousename);
        const totalQuantity = getTotalQuantityForWarehouse(warehouse.warehousename);
        navigate(`/manage_each`, { 
            state: { 
                warehouse, 
                requestCount, 
                totalQuantity 
            } 
        });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Warehouse ID</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Distance</th>
                        <th>Request Count</th>
                        <th>Total Quantity</th>
                        <th>Actions</th> {/* Add Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((warehouse, index) => {
                        const totalQuantity = getTotalQuantityForWarehouse(warehouse.warehousename);
                        const exceedsCapacity = totalQuantity > warehouse.totalcapacity; // Check if exceeds capacity

                        return (
                            <tr key={index} className={exceedsCapacity ? 'exceeds-capacity' : ''}>
                                <td>{warehouse.idofwarehouse}</td>
                                <td>{warehouse.warehousename}</td>
                                <td>{warehouse.totalcapacity}</td>
                                <td>{warehouse.distance}</td>
                                <td>{getRequestCountForWarehouse(warehouse.warehousename)}</td>
                                <td>{totalQuantity}</td>
                                <td>
                                    <button onClick={() => handleRowClick(warehouse)} className='view-btn'>View Details</button> {/* Button to navigate */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default FertilizerMng;
