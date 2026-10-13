import React, { useRef } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { state } from './Store';

export function Mug(props) {
  const { nodes, materials } = useGLTF('/mug-transformed.glb');
  const snap = useSnapshot(state);
  const mainRef = useRef();

  // Load active decal texture (fallback to default placeholder if empty)
  const texture = useTexture(snap.logoTexture || '/logo1.png');

  useFrame((_, delta) => {
    if (mainRef.current) {
      easing.dampC(mainRef.current.material.color, snap.bottleColor, 0.25, delta);
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Target ONLY the main body */}
      <mesh ref={mainRef} geometry={nodes.main_Baked.geometry}>
        <meshPhysicalMaterial roughness={0.3} metalness={1} />

        {/* Decal sticker on the bottle body */}
        {snap.logoTexture && (
          <Decal
            position={[0,0,0.12]}     // [X, Y, Z] - adjust Z to the front surface radius
            rotation={[0, 0, 0]}        // [X, Y, Z] - orientation of the sticker
            scale={[0.15, 0.2, 0.3]}  // [width, height, depth]
            map={texture}
            polygonOffset                     // Prevents z-fighting and double-surface blending
  polygonOffsetFactor={-2}
          />
        )}
      </mesh>

      {/* Untouched parts retain their original baked texture */}
      <mesh geometry={nodes.middle_Baked.geometry} material={materials['MergedBake_Baked.001']} />
      <mesh geometry={nodes.top_Baked.geometry} material={materials['MergedBake_Baked.001']} />
      <mesh geometry={nodes.mouth_Baked.geometry} material={materials['MergedBake_Baked.001']} />
    </group>
  );
}

useGLTF.preload('/mug-transformed.glb');
// Preload textures to prevent screen freeze on first toggle
useTexture.preload('/logo1.png');