import { useEffect, useState } from 'react'

export default function AstroCount() {
  const [number, setNumber] = useState(null);
  const [astronauts, setAstronauts] = useState([]);
  const [crafts, setCrafts] = useState([]);

  async function fetchData() {
      try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();
        setNumber(data.number);
        setAstronauts(data.people.map(person => person.name));
        setCrafts(data.people.map(person => person.craft));
      } catch (error) {
        console.error('Error fetching astro data:', error);
      };
    };

  useEffect(() => {

    fetchData()

    const intervalId = setInterval(fetchData, 300000); // Fetchs data every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="astro-data">
      <h3>People in space: {number}</h3>
      
      <ul>
        {astronauts.map((astronaut, index) => (
          <li key={index}>
            {astronaut} - {crafts[index]}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

