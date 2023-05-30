import { useEffect, useState } from 'react';

function AstroCount() {
  const [number, setNumber] = useState(null);
  const [astronauts, setAstronauts] = useState([]);
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();
        setNumber(data.number);
        setAstronauts(data.people.map(person => person.name));
        setCrafts(data.people.map(person => person.craft));
      } catch (error) {
        console.error('Error fetching astro data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>Number of astronauts: {number}</p>
      <ul>
        {astronauts.map((astronaut, index) => (
          <li key={index}>
            {astronaut} - {crafts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AstroCount;
