 
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';

 
// const vehicleIcon = new L.Icon({
//   iconUrl: 'https://i.ibb.co/PzHMqrW/icon-car.png',  
//   iconSize: [32, 32],
// });

// const Map = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(null);
//   const [route, setRoute] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/vehicle');
//         const data = response.data;
//         setVehiclePosition(data[data.length - 1]);
//         setRoute(data);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MapContainer center={[17.385044, 78.486671]} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {vehiclePosition && (
//         <Marker position={[vehiclePosition.latitude, vehiclePosition.longitude]} icon={vehicleIcon} />
//       )}
//       <Polyline positions={route.map(pos => [pos.latitude, pos.longitude])} />
//     </MapContainer>
//   ); 
// };

// export default Map;


// src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://i.ibb.co/PzHMqrW/icon-car.png',  
  iconSize: [32, 32],
  iconAnchor: [16, 16], // Anchor the icon at its center
});

const Map = () => {
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bitry.onrender.com');
        const data = response.data;
        console.log('Fetched vehicle data:', data);
        setVehiclePosition(data[data.length - 1]);
        setRoute(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[17.385044, 78.486671]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehiclePosition && (
        <Marker position={[vehiclePosition.latitude, vehiclePosition.longitude]} icon={vehicleIcon} />
      )}
      <Polyline positions={route.map((pos) => [pos.latitude, pos.longitude])} />
    </MapContainer>
  );
};

export default Map;
