import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, Stage } from '@react-three/drei'
import * as THREE from 'three'
function Weapon({ skinPath }) {
  const { scene } = useGLTF('/ak47.glb') 
  const texture = useTexture(skinPath)
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace 

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
        child.material.roughness = 0.5
        child.material.metalness = 0.6
        child.material.needsUpdate = true
      }
    })
  }, [scene, texture])

  return <primitive object={scene} />
}

export default function CS2Viewer() {
  const [currentSkin, setCurrentSkin] = useState('/skin_redline.jpg')

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: 20, left: 0, width: '100%', textAlign: 'center', color: 'white', zIndex: 10, pointerEvents: 'none' }}>
        <h1 style={{ fontFamily: 'Arial Black', margin: 0, fontSize: '3rem', letterSpacing: '-2px' }}>CS2 INSPECT</h1>
        <p style={{ fontFamily: 'monospace', color: '#ccc' }}>PREVIEW BUILD v0.1</p>
      </div>

      <Canvas dpr={[1, 2]} camera={{ fov: 45 }} shadows>
        <color attach="background" args={['#1a1a1a']} />
        
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} makeDefault />
    
        <Stage environment="city" intensity={0.5} contactShadow={false}>
          <Weapon skinPath={currentSkin} />
        </Stage>
      </Canvas>
      <div style={{ position: 'absolute', bottom: 50, width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', zIndex: 10 }}>
        <button onClick={() => setCurrentSkin('/skin_redline.jpg')} style={{ padding: '15px 30px', background: '#b30000', color: 'white', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
          REDLINE
        </button>
        <button onClick={() => setCurrentSkin('/skin_blue.jpg')} style={{ padding: '15px 30px', background: '#004080', color: 'white', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
          BLUE LAMINATE
        </button>
      </div>
    </div>
  )
}