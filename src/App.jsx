import AstroCount from './services/AstroCount';
import ISSCoordinates from './services/ISSCoordinates';
import World from './globe/World';
import { useState } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [issData, setIssData] = useState([
    {
      lat: 0,
      lng: 0
    }
  ]);

  function handlePositionChange(lng, lat) {
    setIssData([
      {
        lat: lng,
        lng: lat
      }
    ]);
  }

  return (
    <>
      <ISSCoordinates handlePositionChange={handlePositionChange} issData={issData} setIsLoading={setIsLoading} />
      {!isLoading && <World issData={issData} />}
      <AstroCount />
    </>
  );
}
