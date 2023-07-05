import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import PropTypes from 'prop-types';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

World.propTypes = {
  issData: PropTypes.array.isRequired
};

export default function World(props) {
  const globeEl = useRef();

  // need to use state so component is rerendered when finished loading object
  const [issObj, setIssObj] = useState();

  useEffect(() => {
    // Resizes globe to fit window
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      globeEl.current.width = width;
      globeEl.current.height = height;
      globeEl.current.renderer().setSize(width, height);
      globeEl.current.camera().aspect = width / height;
      globeEl.current.camera().updateProjectionMatrix();
    };

    // Adds event listener for window resize
    window.addEventListener('resize', handleResize);


    globeEl.current.pointOfView({ lat: props.issData[0].lat, lng: props.issData[0].lng, altitude: 2 });
    const orbitControls = globeEl.current.controls()
    orbitControls.enableZoom = false;
    
    const loader = new GLTFLoader();
    loader.load(
      '../scene.gltf',
      function (gltf) {
        // Gets the loaded GLTF scene
        const scene = gltf.scene;
        scene.scale.set(0.3, 0.3, 0.3); // Adjusts the scale factor
  
        // Sets the modified scene as the value of issObj
        setIssObj(scene);

      },
      undefined,
      function (error) {
        console.error('Error loading GLTF object:', error);
      }
    );

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        customLayerData={props.issData}
        customLayerLabel={obj => {
          return `<div><b>International Space Station</b></div>
                  <div>Latitude: ${parseFloat(obj.lat).toFixed(2)}</div> 
                  <div>Latitude: ${parseFloat(obj.lng).toFixed(2)}</div>`;
        }}
        onCustomLayerClick={() => window.open('https://www.nasa.gov/mission_pages/station/main/index.html', '_blank')}
        customThreeObject={issObj}
        customThreeObjectUpdate={(obj, d) => {
          const position = globeEl.current.getCoords(d.lat, d.lng, 408 / 6371); //sets coordinates and sets altitude of ISS to 408km
          Object.assign(obj.position, position);
  
          // Applies rotation to maintain the object's orientation, directs towards earths center. 
          obj.lookAt(new THREE.Vector3(0, 0, 0)); 
          obj.rotateX(Math.PI / 2); // Applies a 90-degree rotation around the x-axis
          obj.rotateY(Math.PI / 1); // Applies a 180-degree rotation around the y-axis
          
        }}
      />
    </div>
  );
}
