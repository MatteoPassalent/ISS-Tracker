import {useEffect} from 'react';
import PropTypes from 'prop-types';

ISSCoordinates.propTypes = {
  handlePositionChange: PropTypes.func.isRequired,
  issData: PropTypes.array.isRequired,
  setIsLoading: PropTypes.func.isRequired
};

export default function ISSCoordinates(props) {

  async function fetchISSPosition() {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json()
      props.handlePositionChange(data.iss_position.latitude, data.iss_position.longitude);
    } catch (error) {
      console.error('Error fetching ISS position:', error);
    } finally {
      props.setIsLoading(false); // Sets isLoading to false when the async function is finished
    }
  }

  useEffect(() => {
    // Fetchs coordinates immediately
    fetchISSPosition();

    // Fetchs coordinates every 5 seconds
    const intervalId = setInterval(fetchISSPosition, 5000);

    // Cleans up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    
    <div className="coordinates">
      <h2>International Space Station Tracker</h2>
      {/* <h2>Latitude: {parseFloat(props.issData[0].lat).toFixed(2)}</h2>
      <h2>Longitude: {parseFloat(props.issData[0].lng).toFixed(2)}</h2> */}
    </div>
    
  )
}
