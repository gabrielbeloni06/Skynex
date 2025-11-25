import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, Stage, Html } from '@react-three/drei'
import * as THREE from 'three'
const MODEL_PATH = "/ak47.glb" 
const LOCAL_TEXTURES = [
  "/skin_redline.jpg",
  "/skin_blue.jpg"
]
function WeaponModel({ textureIndex }) {
  const { scene } = useGLTF(MODEL_PATH)
  const skinFile = LOCAL_TEXTURES[textureIndex % LOCAL_TEXTURES.length]
  const texture = useTexture(skinFile)
  
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

  return <primitive object={scene} scale={1.5} rotation={[0, Math.PI / 2, 0]} />
}
function ErrorBox() {
  return (
    <Html position={[0, 0, 0]} center>
      <div style={{ color: 'red', background: 'black', padding: '10px', border: '1px solid red' }}>
        ERRO 3D<br/>Verifique ak47.glb na pasta public
      </div>
    </Html>
  )
}

export default function CS2Viewer() {
  const [skins, setSkins] = useState([])
  const [selectedSkin, setSelectedSkin] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json')
        const data = await response.json()
        const akSkins = data.filter(s => 
          s.weapon.name === "AK-47" && s.image && !s.name.includes("Vanilla")
        ).slice(0, 20)
        const skinsWithPrice = akSkins.map(s => ({
          ...s,
          price: "R$ " + (Math.random() * 800 + 50).toFixed(2),
          float: Math.random().toFixed(4)
        }))

        setSkins(skinsWithPrice)
        setSelectedSkin(skinsWithPrice[0])
        setSelectedIndex(0)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div style={{height:'100vh', background:'#1a1a1a', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Carregando Mercado...</div>

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '350px', background: 'rgba(0,0,0,0.9)', color: 'white', padding: '30px', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '2rem', letterSpacing: '-1px' }}>MARKETPLACE</h1>
        
        {selectedSkin && (
          <>
            <div style={{ padding: '20px', background: '#222', borderRadius: '10px', border: `2px solid ${selectedSkin.rarity.color}` }}>
              <h2 style={{ margin: 0, color: selectedSkin.rarity.color }}>{selectedSkin.name.replace('AK-47 | ', '')}</h2>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>AK-47 • {selectedSkin.rarity.name}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '1.1rem' }}>
                <span>Preço:</span>
                <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{selectedSkin.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.9rem', color: '#aaa' }}>
                <span>Float:</span>
                <span>{selectedSkin.float}</span>
              </div>
            </div>

            <p style={{ color: '#666', marginTop: '20px', fontSize: '0.8rem' }}>
              {selectedSkin.description || "Uma das armas mais populares e letais do mundo. Design exclusivo importado."}
            </p>

            <button style={{ marginTop: 'auto', padding: '15px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
              COMPRAR AGORA
            </button>
          </>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 5] }} shadows>
          <color attach="background" args={['#151515']} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} />
          <Stage environment="city" intensity={0.7}>
            <Suspense fallback={null}>
              <WeaponModel textureIndex={selectedIndex} />
            </Suspense>
          </Stage>
        </Canvas>
        <div style={{ 
          position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', 
          display: 'flex', gap: '10px', maxWidth: '90%', overflowX: 'auto', padding: '10px',
          background: 'rgba(0,0,0,0.5)', borderRadius: '15px', backdropFilter: 'blur(5px)'
        }}>
          {skins.map((skin, index) => (
            <div 
              key={skin.id}
              onClick={() => { setSelectedSkin(skin); setSelectedIndex(index); }}
              style={{
                minWidth: '100px', height: '110px',
                background: selectedSkin?.id === skin.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: selectedSkin?.id === skin.id ? `2px solid ${skin.rarity.color}` : '2px solid transparent',
                borderRadius: '8px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: '0.2s'
              }}
            >
              <img src={skin.image} style={{ width: '80px', height: 'auto' }} alt="" />
              <span style={{ color: '#ddd', fontSize: '0.7rem', marginTop: '5px', textAlign: 'center', maxWidth: '90%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {skin.name.split('|')[1]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}