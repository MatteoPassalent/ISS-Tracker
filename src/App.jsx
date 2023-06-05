import './App.css'
import AstroCount from './services/AstroCount';
import ISSCoordinates from './services/ISSCoordinates';
import World from './globe/World';
import {useState} from 'react'

function App() {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  return (
    <>
      <World lat={latitude} lng={longitude} />
      <ISSCoordinates
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <AstroCount />
    </>
  );
}

export default App;
