import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Mug } from './Mug'
import { RectAreaLight } from 'three'
import { useRef } from 'react'
import { useHelper, PresentationControls} from '@react-three/drei'
import { RectAreaLightHelper } from 'three-stdlib'
import { useEffect } from 'react'
import { RectAreaLightUniformsLib } from 'three-stdlib'
import { ContactShadows } from '@react-three/drei'
import { Float } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from './Store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const Scene = () => {
  const light1= useRef()
    const light2= useRef()
        const light3= useRef()


  // useHelper(light1, RectAreaLightHelper, 'cyan')
  // useHelper(light2, RectAreaLightHelper, 'red')
  // useHelper(light3, RectAreaLightHelper, 'green')

   useEffect(() => {
    RectAreaLightUniformsLib.init()
  }, [])

const modelref = useRef(null)

const snap = useSnapshot(state)
 useGSAP(
  () => {
    if (!modelref.current) return;

    gsap.to(modelref.current.position, {
      y: 0,
      duration: 5,
      ease: 'back.out', // Note: lowercase 'out' (back.out)
      scrollTrigger: {
        trigger: '#hero-section', // Or pass your Section1 container ref directly
        start: 'top  80%', // Triggers at the exact same point as Section1
        toggleActions: 'play none none reverse', 
       // Plays forward on scroll down, reverses on scroll up
      },
    });
  },
  { dependencies: [modelref.current] }
);

  return ( <>
     <PresentationControls/>
    <PerspectiveCamera fov={45}/>
    <Environment files={'studio_small_05_1k.hdr'}  environmentIntensity={0.5} environmentRotation={[5,5,5]}/>
     <rectAreaLight    ref={light1}
        width={8}
        height={10}
        intensity={3}
        rotation={[0,-1.5,0]}
        position={[-3,-0.4,2]}
        color="#ffffff"
      /> 

           <rectAreaLight    ref={light2}
        width={4}
        height={10}
        intensity={1}
        rotation={[0,1,0]}
        position={[2,-0.4,2]}
        color="#ffffff"
      /> 
       <rectAreaLight    ref={light3}
        width={8}
        height={10}
        intensity={2}
        rotation={[0,-3,0]}
        position={[-1,-0.4,-3]}
        color="#ffffff"
      /> 

    <PresentationControls
      global={false}        // Spin only when dragging over the canvas
      cursor={true}         // Changes cursor to grab
      speed={1.5}           // Drag sensitivity
      polar={[-Math.PI / 6, Math.PI / 6]}  // Vertical tilt limits (prevents upside down view)
      azimuth={[-Infinity, Infinity]}      // Horizontal spin (free 360 degree rotation)
      snap={false}          // Snap back to front on release (true / false)
    >




  <group ref={modelref} scale={13} rotation={[0,-.09,0] } position={[0,-8,0]}>
  
<Float
        speed={2}          // Animation speed (default: 1)
        rotationIntensity={0.2} // XYZ rotation intensity (default: 1)
        floatIntensity={0.2}    // Up/down bobbing intensity (default: 1)
        floatingRange={[-0.1, 0]} // Range of y-axis values the object floats between
      >
        <Center>
        <Mug />
        </Center>
      </Float>    
  </group>
 
 
  </PresentationControls>
 
       
    </>
  )
}

export default Scene