import './css/App.css'
import AstroCount from './services/AstroCount';
import ISSCoordinates from './services/ISSCoordinates';
import World from './globe/World';
import { useState } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [issData, setIssData] = useState([
    {
      lat: 0,
      lng: 0,
      alt: 408 / 6371,
      radius: 3,
      color: 'red'
    }
  ]);

  function handlePositionChange(lng, lat) {
    setIssData([
      {
        lat: lng,
        lng: lat,
        alt: 408 / 6371,
        radius: 3,
        color: 'red'
      }
    ]);
  }

  return (
    <>
      <ISSCoordinates handlePositionChange={handlePositionChange} issData={issData} setIsLoading={setIsLoading} />
      {!isLoading && <World issData={issData} />} {/* Render World component only when isLoading is false */}
      <AstroCount />
    </>
  );
}
