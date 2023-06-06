import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import PropTypes from 'prop-types';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

World.propTypes = {
  issData: PropTypes.array.isRequired
};

export default function World(props) {
  const globeEl = useRef();
  const tbControlsRef = useRef();

  const [issObj, setIssObj] = useState()

  useEffect(() => {
    // Resize globe to fit window
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      globeEl.current.width = width;
      globeEl.current.height = height;
      globeEl.current.renderer().setSize(width, height);
      globeEl.current.camera().aspect = width / height;
      globeEl.current.camera().updateProjectionMatrix();
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially, maybe optional?
    //handleResize();

    globeEl.current.pointOfView({ lat: props.issData[0].lat, lng: props.issData[0].lng, altitude: 3.5 });
    const tbControls = new TrackballControls(globeEl.current.camera(), globeEl.current.renderer().domElement);
    tbControlsRef.current = tbControls;

    tbControls.minDistance = 500;
    tbControls.rotateSpeed = 0.1;
    tbControls.zoomSpeed = 4;

    const loader = new GLTFLoader();
    loader.load(
      '../scene.gltf',
      function (gltf) {
        // Get the loaded GLTF scene
        const scene = gltf.scene;
        scene.scale.set(0.3, 0.3, 0.3); // Adjust the scale factor as needed
  
        // Set the modified scene as the value of issObj
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
        customThreeObject={issObj}
        customThreeObjectUpdate={(obj, d) => {
          const position = globeEl.current.getCoords(d.lat, d.lng, d.alt);
          Object.assign(obj.position, position);
  
          // Apply rotation to maintain the object's orientation, directs towards earths center. 
          obj.lookAt(new THREE.Vector3(0, 0, 0)); 
          obj.rotateX(Math.PI / 2); // Apply a 90-degree rotation around the y-axis
          obj.rotateY(Math.PI / 1); // Apply a 180-degree rotation around the y-axis
        }}
      />
    </div>
  );
}
