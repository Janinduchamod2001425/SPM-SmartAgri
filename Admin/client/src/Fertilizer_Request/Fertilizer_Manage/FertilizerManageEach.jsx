import React, { useEffect, useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; 
import Chart from 'chart.js/auto'; 
import './FertilizerManageEach.css';

const FertilizerManageEach = () => {
    const location = useLocation();
    const { warehouse, requestCount, totalQuantity } = location.state;

    const [fertilizerReqs, setFertilizerReqs] = useState([]);
    const [fertilizerSummary, setFertilizerSummary] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Quantity',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 50,
            },
        ],
    });

    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric' });

    useEffect(() => {
        const fetchFertilizerReqs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/geFertilizerReqs');
                const relevantReqs = response.data.data.filter(req => req.warehousename === warehouse.warehousename);

                const summary = relevantReqs.reduce((acc, req) => {
                    const existing = acc.find(item => item.fertilizertype === req.fertilizertype);
                    if (existing) {
                        existing.requestCount += 1;
                        existing.totalQuantity += req.quantity;
                    } else {
                        acc.push({
                            fertilizertype: req.fertilizertype,
                            requestCount: 1,
                            totalQuantity: req.quantity,
                        });
                    }
                    return acc;
                }, []);

                setFertilizerReqs(relevantReqs);
                setFertilizerSummary(summary);

                if (summary.length > 0) {
                    setChartData({
                        labels: summary.map(item => item.fertilizertype),
                        datasets: [
                            {
                                label: 'Total Quantity',
                                data: summary.map(item => item.totalQuantity),
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                barThickness: 50,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching fertilizer requests', error);
            }
        };

        fetchFertilizerReqs();
    }, [warehouse.warehousename]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="report-container">
            <header className="report-header">
                <div className="logo-placeholder">🌾SmartAgri</div>
                <div className="header-content">
                    <h3>Fertilizer Distribution Report</h3>
                    <p className="report-date">{formattedDate}</p>
                </div>
            </header>

            <div className="summary-section">
                <h5 className='cont'>Warehouse Details</h5>
                <table className="warehouse-details-table">
                    <tbody>
                        <tr>
                            <td>Warehouse ID:</td>
                            <td className='tabl'>{warehouse.idofwarehouse}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td className='tabl'>{warehouse.warehousename}</td>
                        </tr>
                        <tr>
                            <td>Capacity:</td>
                            <td className='tabl'>{warehouse.totalcapacity}</td>
                        </tr>
                        <tr>
                            <td>Distance:</td>
                            <td className='tabl'>{warehouse.distance} km</td>
                        </tr>
                        <tr>
                            <td>Request Count:</td>
                            <td className='tabl'>{requestCount}</td>
                        </tr>
                        <tr>
                            <td>Total Quantity:</td>
                            <td className='tabl'>{totalQuantity} units</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="fertilizer-summary-section">
                <h5 className='cont1'>Fertilizer Requests Summary</h5>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Fertilizer Type</th>
                            <th>Request Count</th>
                            <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fertilizerSummary.map((item, index) => (
                            <tr key={index}>
                                <td className='tabl'>{item.fertilizertype}</td>
                                <td className='tabl'>{item.requestCount}</td>
                                <td className='tabl'>{item.totalQuantity} units</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h5 className='cont3'>Total Quantity of Fertilizers</h5>
                {fertilizerSummary.length > 0 ? (
                    <div className="chart-container"> 
                        <Bar 
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Fertilizer Type vs Total Quantity',
                                    },
                                },
                            }}
                        />
                    </div>
                ) : (
                    <p>No fertilizer requests available for this warehouse.</p>
                )}
            </div>

            <button className="print-button" onClick={handlePrint}>Print Report</button>
        </div>
    );
};

export default FertilizerManageEach;
