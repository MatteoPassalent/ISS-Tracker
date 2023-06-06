import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import PropTypes from 'prop-types';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

World.propTypes = {
  issData: PropTypes.array.isRequired
};

export default function World(props) {
  const globeEl = useRef();
  const tbControlsRef = useRef();

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
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: props.issData[0].lat, lng: props.issData[0].lng, altitude: 3.5 });
    const tbControls = new TrackballControls(globeEl.current.camera(), globeEl.current.renderer().domElement);
    tbControlsRef.current = tbControls;

    tbControls.minDistance = 500;
    tbControls.rotateSpeed = 0.1;
    tbControls.zoomSpeed = 4;
  }, []);

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        customLayerData={props.issData}
        customThreeObject={d =>
          new THREE.Mesh(
            new THREE.SphereGeometry(d.radius),
            new THREE.MeshLambertMaterial({ color: d.color })
          )
        }
        customThreeObjectUpdate={(obj, d) => {
          Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
        }}
      />
    </div>
  );
}
