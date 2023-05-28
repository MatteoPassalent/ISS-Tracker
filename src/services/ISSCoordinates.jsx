import { useEffect, useState } from 'react';

export default function ISSCoordinates() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const fetchISSPosition = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      setLatitude(data.iss_position.latitude);
      setLongitude(data.iss_position.longitude);
    } catch (error) {
      console.error('Error fetching ISS position:', error);
    }
  };

  useEffect(() => {
    // Fetch coordinates immediately
    fetchISSPosition();

    // Fetch coordinates every 5 seconds
    const intervalId = setInterval(fetchISSPosition, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
}
