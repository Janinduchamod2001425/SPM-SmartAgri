import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DistributionOptimize = () => {
  const [distribution, setDistribution] = useState([]);
  const [fertilizerReqs, setFertilizerReqs] = useState([]);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const [distributionResponse, fertilizerReqResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/optimizeDistribution', {
            params: { totalQuantity: 1000 } // Example total quantity
          }),
          axios.get('http://localhost:8000/api/geFertilizerReqs') // Fetch fertilizer requests
        ]);

        setDistribution(distributionResponse.data.data);
        setFertilizerReqs(fertilizerReqResponse.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchDistribution();
  }, []);

  // Function to calculate total quantity requested for a warehouse
  const getTotalQuantityForWarehouse = (warehousename) => {
    return fertilizerReqs
      .filter(req => req.warehousename === warehousename)
      .reduce((total, req) => total + req.quantity, 0);
  };

  return (
    <div>
      <h2>Optimized Fertilizer Distribution</h2>
      <ul>
        {distribution.map((warehouse, index) => (
          <li key={index}>
            {warehouse.warehousename} (Distance: {warehouse.distance} km) - Total Quantity: {getTotalQuantityForWarehouse(warehouse.warehousename)} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistributionOptimize;
