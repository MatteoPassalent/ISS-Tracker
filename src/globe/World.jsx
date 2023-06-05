import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// custom globe material
const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
  globeMaterial.specularMap = texture;
  globeMaterial.specular = new THREE.Color('grey');
  globeMaterial.shininess = 15;
});

export default function World() {
  const globeEl = useRef();
  const tbControlsRef = useRef();

  useEffect(() => {
    const directionalLight = globeEl.current.scene().children.find(
      obj3d => obj3d.type === 'DirectionalLight'
    );
    directionalLight && directionalLight.position.set(1, 1, 1);

    // Initialize TrackballControls
    const tbControls = new TrackballControls(
      globeEl.current.camera(),
      globeEl.current.renderer().domElement
    );
    tbControlsRef.current = tbControls;

    // Set custom properties
    tbControls.minDistance = 500;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Animation loop
    const animate = () => {
      tbControls.update();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      // Dispose TrackballControls
      tbControlsRef.current.dispose();
    };
  }, []);

  return (
    
    <Globe
      ref={globeEl}
      globeMaterial={globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    />
  );
}
