import {useEffect} from 'react'
import PropTypes from 'prop-types';

ISSCoordinates.propTypes = {
  setLatitude: PropTypes.number.isRequired,
  setLongitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default function ISSCoordinates(props) {

  async function fetchISSPosition() {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json()
      props.setLatitude(data.iss_position.latitude)
      props.setLongitude(data.iss_position.longitude)
    } catch (error) {
      console.error('Error fetching ISS position:', error)
    }
  }

  useEffect(() => {
    // Fetch coordinates immediately
    fetchISSPosition()

    // Fetch coordinates every 5 seconds
    const intervalId = setInterval(fetchISSPosition, 5000)

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <p>Latitude: {props.latitude}</p>
      <p>Longitude: {props.longitude}</p>
    </div>
  )
}
