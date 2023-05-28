
import './App.css'
import AstroCount from './services/AstroCount';
import ISSCoordinates from './services/ISSCoordinates';
import ThreeGlobef from './globe/ThreeGlobef';

function App() {

  return(
    <>
      < ThreeGlobef />
      < ISSCoordinates />
      < AstroCount />
    </>
  )
}

export default App;

