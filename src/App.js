import './App.scss';
import { useRef, useState } from 'react';
import Header from './Header';


import { Canvas, useFrame } from 'react-three-fiber';

import { softShadows, MeshWobbleMaterial, OrbitControls} from '@react-three/drei';

softShadows();

const SpinningMesh = (props) => {
  const mesh = useRef(null);

    // useFrame must be in its own component, not in the App() function
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh castShadow position={props.position} ref={mesh}>
    <sphereBufferGeometry attach='geometry' args={props.args} />
    <MeshWobbleMaterial attach='material' color={props.color} speed={props.speed} factor={0.6}/>
    </mesh>
  );
};

function App() {
  
  return (
    <>
    <Header />
    <Canvas shadows colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
    {/* add ambient light, globally illuminating all objects on the scene  */}
      
      <ambientLight intensity={0.8} />
      <directionalLight 
        castShadow
        position={[0, 10, 0]}
        intensity={0.6}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.6}/>
      <pointLight position={[0, -10, 0]} intensity={0.6}/>


      <group>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeBufferGeometry attach='geometry' args={[100, 100]}/>
          <shadowMaterial attach='material' opacity={0.3}/>
          
        </mesh>

        <SpinningMesh position={[0, 1, 0]} args={[2, 2, 1]} color='lightpink' speed={1}/>
        <SpinningMesh position={[-3, 1, -5]} args={[1, 2]} color='lightblue' speed={6}/>
        <SpinningMesh position={[7, 1, -2]} args={[1, 1]} color='lightblue' speed={6}/>

      </group>
      
      <OrbitControls />
    </Canvas>
    </>
  );

}

export default App;
