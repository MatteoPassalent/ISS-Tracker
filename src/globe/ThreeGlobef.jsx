import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import ThreeGlobe from 'three-globe';

const ThreeGlobef = () => {
  const globeContainerRef = useRef();
  const mountRef = useRef(); // Reference to the mount point for the renderer

  useEffect(() => {
    // Create Three.js globe
    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

    // Custom globe material
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.bumpScale = 10;
    new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
      globeMaterial.specularMap = texture;
      globeMaterial.specular = new THREE.Color('grey');
      globeMaterial.shininess = 15;
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    const containerWidth = 1000; // Set the desired width of the container
    const containerHeight = (containerWidth / window.innerWidth) * window.innerHeight; // Calculate height based on aspect ratio
    renderer.setSize(containerWidth, containerHeight);

    // Mount the renderer to the separate mount point within the container
    if (!mountRef.current) {
      mountRef.current = document.createElement('div');
      globeContainerRef.current.appendChild(mountRef.current);
    }

    mountRef.current.appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc));
    scene.add(directionalLight);

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 20;
    tbControls.zoomSpeed = 0.8;

    // Animation loop
    const animate = () => {
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up Three.js objects on component unmount
    return () => {
      renderer.dispose();
      tbControls.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="globe">
      <div ref={globeContainerRef} id="globeViz" style={{ width: '1000px' }} />
    </div>
  );
};

export default ThreeGlobef;
