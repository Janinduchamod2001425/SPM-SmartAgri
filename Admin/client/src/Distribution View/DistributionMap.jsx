import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

// Set the container style
const containerStyle = {
  width: '100%',
  height: '100vh', // Full height of the viewport
};

const DistributionMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null); // State for storing directions
  const [address, setAddress] = useState(''); // State for the input address
  const [distance, setDistance] = useState(''); // State for the distance

  useEffect(() => {
    // Function to get the current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          () => {
            alert("Geolocation service failed. Please allow location access.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  const handleGetDirections = async () => {
    if (!currentLocation || !address) {
      alert('Please enter an address and ensure your location is available.');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: currentLocation,
        destination: address,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setDirections(result);

      // Extract distance and duration from the result
      const distanceText = result.routes[0].legs[0].distance.text; // e.g., "5.3 km"
      const durationText = result.routes[0].legs[0].duration.text; // e.g., "10 mins"
      setDistance(`Distance: ${distanceText}, Duration: ${durationText}`);
    } catch (error) {
      console.error('Error fetching directions:', error);
      alert('Could not find directions. Please try another address.');
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCtCUrpBVqFhczHWSFexBixHdVL3RAjTCs">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: '10px', margin: '10px' }} // Styling for the input
        />
        <button onClick={handleGetDirections} style={{ padding: '10px', margin: '10px' }}>
          Get Directions
        </button>
        {/* Display distance and duration */}
        {distance && <div style={{ margin: '10px', fontWeight: 'bold' }}>{distance}</div>}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: 6.9271, lng: 79.8612 }} // Default to Colombo if no location
          zoom={15} // Zoom level for a closer view
          options={{
            draggable: true, // Ensure the map is draggable
            scrollwheel: true, // Allow zoom with mouse wheel
            disableDefaultUI: true, // Disable default UI if you want a clean look
          }}
        >
          {currentLocation && (
            <Marker position={currentLocation} />
          )}
          {directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DistributionMap;
