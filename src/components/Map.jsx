import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MapContainer, 
  TileLayer, Marker, 
  Popup, 
  useMapEvents,
  useMap } from 'react-leaflet';
import styles from './Map.module.css';

import { useCities } from '../contexts/CitiesContext'


function Map() {
  const { data } = useCities();
  const [query, setQuery] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  
  const mapLat = query.get('lat');
  const mapLng = query.get('lng');
  
  useEffect(function() {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  

  return (<div className={styles.mapContainer}>
      <MapContainer 
        center={mapPosition} 
        zoom={13} 
        scrollWheelZoom={true} 
        className={styles.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {data.map(citye => <Marker position={[citye.position.lat, citye.position.lng]}>
        <Popup>
          <span>{citye.emoji}</span> <span>{citye.cityName}</span>
        </Popup>
      </Marker>)}
      {mapPosition.includes(mapLat && mapLng) && <ContriesCitye position={mapPosition}/>}
      <DecliveCitye />
    </MapContainer>
  </div>
  )
}

function ContriesCitye({position}) {
  const map = useMap();
  map.setView(position, 10)
  return null;
}

function DecliveCitye() {
  const navigate = useNavigate();
  
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  })
  return null;
}


export default Map;
