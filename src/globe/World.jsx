import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import PropTypes from 'prop-types';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';



World.propTypes = {
  issData: PropTypes.array.isRequired
};

export default function World(props) {

  const globeEl = useRef();
  const tbControlsRef = useRef();

  
  useEffect(() => {
    console.log(props)
    // not working, world complonent is rendering before props load lat: props.lat, lng: props.lng,
    globeEl.current.pointOfView({ lat: props.issData[0].lat, lng: props.issData[0].lng, altitude: 3.5 });
    // Initialize TrackballControls TRACKball controls not working
    const tbControls = new TrackballControls(
    globeEl.current.camera(),
    globeEl.current.renderer().domElement
    );
    tbControlsRef.current = tbControls;

    // Set custom properties
    tbControls.minDistance = 500;
    tbControls.rotateSpeed = 0.1;
    tbControls.zoomSpeed = 4;
    
  }, []);

  return( 
  <div className="globe-container">
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      width={1000}
      height={600}
      
      customLayerData={props.issData}
      customThreeObject={d => new THREE.Mesh(
        new THREE.SphereGeometry(d.radius),
        new THREE.MeshLambertMaterial({ color: d.color })
      )}
      customThreeObjectUpdate={(obj, d) => {
        Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
      }}
    /> 
  </div>
  )
}