import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import PropTypes from 'prop-types';

const N = 1;
const randomData = [...Array(N).keys()].map(() => ({
  lat: 31.6241,
  lng: -74.0238,
  alt: 408/6371,
  radius: 3,
  color: 'red'
}));

World.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default function World(props) {

  const globeEl = useRef();
  const [data, setData] = useState(randomData);

  useEffect(() => {
    (function moveSpheres() {
      setData(prevData => prevData.map(prev => ({
        ...prev,
        lat: props.lat,
        lng: props.lng
      })));
      requestAnimationFrame(moveSpheres);
    })();
  }, [props.lat, props.lng]);
  

  useEffect(() => {
    globeEl.current.pointOfView({ altitude: 3.5 });
  }, []);

  return <Globe
    ref={globeEl}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

    customLayerData={data}
    customThreeObject={d => new THREE.Mesh(
      new THREE.SphereGeometry(d.radius),
      new THREE.MeshLambertMaterial({ color: d.color })
    )}
    customThreeObjectUpdate={(obj, d) => {
      Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
    }}
  />;
}