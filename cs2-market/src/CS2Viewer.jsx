import React, { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, Stage, Html, Center, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
const WEAPON_CONFIG = {
  "AK-47": { 
    model: "/ak47.glb", 
    textures: ["/skin_redline.jpg", "/skin_blue.jpg"], 
    scale: 0.1, 
    rotation: [0, Math.PI / 2, 0]
  },
  "AWP": { 
    model: "/awp.glb", 
    textures: ["/skin_awp.jpg", "/skin_awp.jpg"], 
    scale: 1.5,
    rotation: [0, Math.PI / 2, 0]
  },
  "M4A4": { 
    model: "/m4a4.glb", 
    textures: ["/skin_m4.jpg", "/skin_m4.jpg"], 
    scale: 1.5,
    rotation: [0, Math.PI / 2, 0]
  }
}

function WeaponModel({ weaponName, textureIndex, floatValue }) { 
  const config = WEAPON_CONFIG[weaponName] || WEAPON_CONFIG["AK-47"]
  
  const { scene } = useGLTF(config.model)
  const texturePath = config.textures[textureIndex % config.textures.length]
  const texture = useTexture(texturePath)
  
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.material.isCloned) {
             child.material = child.material.clone();
             child.material.isCloned = true;
        }
        child.material.map = texture
        child.material.metalness = 0.8
        child.material.color.setScalar(1 - floatValue * 0.4); 
        child.material.roughness = 0.3 + floatValue * 0.7; 
        child.material.needsUpdate = true
      }
    })
  }, [scene, texture, weaponName, floatValue])

  return (
    <Center top>
      <primitive object={scene} scale={config.scale} rotation={config.rotation} />
    </Center>
  )
}

function ErrorBox({ message }) {
  return (
    <Html center>
      <div style={{ color: '#ff4444', background: 'rgba(0,0,0,0.9)', padding: '20px', border: '1px solid red', borderRadius: '10px', textAlign: 'center', width: '200px' }}>
        <strong>⚠️ ERRO 3D</strong><br/>
        <span style={{fontSize: '0.8rem'}}>{message}</span>
      </div>
    </Html>
  )
}

export default function CS2Viewer() {
  const [allSkinsData, setAllSkinsData] = useState([]) 
  const [displaySkins, setDisplaySkins] = useState([]) 
  const [selectedWeapon, setSelectedWeapon] = useState("AK-47") 
  const [selectedSkin, setSelectedSkin] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [floatValue, setFloatValue] = useState(0.01)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json')
        const data = await response.json()
        setAllSkinsData(data)
      } catch (error) {
        console.error("Erro API:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (allSkinsData.length === 0) return

    const filtered = allSkinsData.filter(s => 
      s.weapon.name === selectedWeapon && s.image && !s.name.includes("Vanilla")
    ).slice(0, 20)

    const skinsWithPrice = filtered.map(s => ({
      ...s,
      price: "R$ " + (Math.random() * 1500 + 100).toFixed(2),
      float: Math.random().toFixed(4)
    }))

    setDisplaySkins(skinsWithPrice)
    
    if (skinsWithPrice.length > 0) {
      setSelectedSkin(skinsWithPrice[0])
      setSelectedIndex(0)
      setFloatValue(parseFloat(skinsWithPrice[0].float)); 
    }
  }, [selectedWeapon, allSkinsData])

  if (loading) return <div style={{height:'100vh', background:'#1a1a1a', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>A carregar Mercado...</div>

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a', display: 'flex', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
      
      <div style={{ width: '80px', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', borderRight: '1px solid #333', zIndex: 20 }}>
        {Object.keys(WEAPON_CONFIG).map(weapon => (
          <div 
            key={weapon}
            onClick={() => setSelectedWeapon(weapon)}
            style={{
              width: '50px', height: '50px', marginBottom: '20px', borderRadius: '10px',
              background: selectedWeapon === weapon ? '#4caf50' : '#222',
              color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem', textAlign: 'center',
              transition: '0.2s', border: selectedWeapon === weapon ? '2px solid white' : '1px solid #444'
            }}
          >
            {weapon}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          
          <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0.6, 3.5] }} shadows>
            
            <color attach="background" args={['#1c1c1c']} />
            <fog attach="fog" args={['#1c1c1c', 0, 15]} /> 
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.5} 
              enableZoom={true} 
              minDistance={3} 
              maxDistance={8}
              minPolarAngle={Math.PI / 2 - 0.1} 
              maxPolarAngle={Math.PI / 2 + 0.1}
            />
            
            <Environment files="/studio.hdr" background={false} />
            <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" castShadow />
            <directionalLight position={[-5, 0, 0]} intensity={0.5} color="#aaaaaa" />
            <ambientLight intensity={0.5} /> 
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#2c2c2c" roughness={0.8} metalness={0.1} />
            </mesh>
            <Stage environment={null} intensity={1} adjustCamera={false}>
              <Suspense fallback={<ErrorBox message="A carregar 3D..." />}>
                <WeaponModel weaponName={selectedWeapon} textureIndex={selectedIndex} floatValue={floatValue} />
              </Suspense>
            </Stage>
            <ContactShadows 
              position={[0, -0.5, 0]} 
              opacity={0.8} 
              scale={10} 
              blur={2} 
              far={4} 
              resolution={256}
              color="#000000"
            />
          </Canvas>
          <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', pointerEvents: 'none' }}>
            <h1 style={{ fontSize: '5rem', margin: 0, opacity: 0.05, textTransform: 'uppercase', fontFamily: 'Impact' }}>
              {selectedWeapon}
            </h1>
          </div>
        </div>
        <div style={{ width: '350px', background: 'rgba(0,0,0,0.8)', borderLeft: '1px solid #333', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(10px)', zIndex: 10 }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
            <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>MARKETPLACE</h2>
            <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '0.8rem' }}>{displaySkins.length} SKINS DISPONÍVEIS</p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
            {displaySkins.map((skin, index) => (
              <div 
                key={skin.id}
                onClick={() => { setSelectedSkin(skin); setSelectedIndex(index); setFloatValue(parseFloat(skin.float)) }} 
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px', marginBottom: '10px', borderRadius: '8px',
                  background: selectedSkin?.id === skin.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: selectedSkin?.id === skin.id ? `1px solid ${skin.rarity.color}` : '1px solid transparent',
                  cursor: 'pointer', transition: '0.2s'
                }}
              >
                <img src={skin.image} style={{ width: '60px', height: '40px', objectFit: 'contain' }} alt="" />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>{skin.name.split('|')[1]}</p>
                  <p style={{ color: skin.rarity.color, fontSize: '0.7rem' }}>{skin.rarity.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: '#4caf50', fontWeight: 'bold', fontSize: '0.8rem' }}>{skin.price}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedSkin && (
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid #333' }}>
              <div style={{marginBottom: '15px'}}>
                <span style={{color:'white', fontSize:'0.9rem', marginBottom:'5px', display:'block'}}>Float ({floatValue.toFixed(4)})</span>
                <input 
                  type="range" 
                  min="0.0001" 
                  max="1.0" 
                  step="0.0001" 
                  value={floatValue}
                  onChange={(e) => setFloatValue(parseFloat(e.target.value))}
                  style={{ width: '100%', height: '5px', background: '#444' }}
                />
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#aaa', marginTop:'5px'}}>
                  <span>Factory New</span>
                  <span>Battle-Scarred</span>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                   <span style={{color:'#aaa', fontSize:'0.7rem'}}>PREÇO BASE</span>
                   <span style={{color:'white', fontSize:'0.9rem'}}>{selectedSkin.price}</span>
                </div>
                <button style={{ padding: '10px 25px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', textTransform:'uppercase' }}>
                  Comprar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}