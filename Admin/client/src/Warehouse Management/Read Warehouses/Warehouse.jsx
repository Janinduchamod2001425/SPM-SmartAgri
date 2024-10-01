import React, { useEffect, useState } from 'react';
import "./Warehouse.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Warehouse = () => {
    const [warehouses, setWarehouse] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/getWarehouses");
                setWarehouse(response.data.data);
            } catch (error) {
                console.error('Error getting warehouses', error);
            }
        };
        fetchWarehouses();
    }, []);

    // Delete warehouse function
    const deleteWarehouse = async (warehouseId) => {
        try {
            const confirmDeletion = window.confirm('Are you sure you want to remove this warehouse?');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/deleteWarehouse/${warehouseId}`);
            setWarehouse((prevWarehouse) => prevWarehouse.filter((warehouse) => warehouse._id !== warehouseId));
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
        } catch (error) {
            console.error('Error deleting warehouse:', error);
        }
    };

    // Filter warehouses based on search term
    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.idofwarehouse.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container">
            <Link to={"/create_Warehouse"} className='add-btn'>Add New Warehouse</Link>
            <Link to={"/distibution_Opt"} className='add-btn1'>Distribution Optimize</Link>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by Warehouse ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <table>
                <thead>
                    <tr>
                        <th>Warehouse ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Region</th>
                        <th>Email</th>
                        <th>Capacity</th>
                        <th>Distance</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWarehouses.map((warehouse, index) => (
                        <tr key={index}>
                            <td>{warehouse.idofwarehouse}</td>
                            <td>{warehouse.warehousename}</td>
                            <td>{warehouse.location}</td>
                            <td>{warehouse.region}</td>
                            <td>{warehouse.email}</td>
                            <td>{warehouse.totalcapacity}</td>
                            <td>{warehouse.distance}</td>
                            <td>{warehouse.managername}</td>
                            <td>
                                <Link to={`/edit_warehouse/` + warehouse._id}>
                                    <button className="update-btn">Update</button>
                                </Link>
                                <button onClick={() => deleteWarehouse(warehouse._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Warehouse;
