import './App.css'
import Overlay from './Overlay'
import gsap from 'gsap'
import Scene from './Scene'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'



const App = () => {
  return (
    <div className=' h-full w-full m-0 p-0' > 
    <div className='fixed inset-0  z-0 '>
 <Canvas  gl={{
    toneMapping: THREE.AgXToneMapping,
    toneMappingExposure: 1,
  }}>      <Suspense fallback={null}>
          <Scene/>
          </Suspense>
    
    </Canvas>
    </div>
<Loader/>

    <div className='absolute inset-0 pointer-events-none z-10'>
        <Overlay/>
        </div>

    </div>
  )
}

export default App