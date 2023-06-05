
import './App.css'
import AstroCount from './services/AstroCount';
import ISSCoordinates from './services/ISSCoordinates';
import World from './globe/World';

function App() {

  return(
    <>
      <World />
      <ISSCoordinates />
      <AstroCount />
    </>
  )
}

export default App;

