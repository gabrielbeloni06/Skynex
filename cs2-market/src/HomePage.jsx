import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
const HERO_BG = '/bg_hero.jpg'; 
const FALLBACK_BG = 'https://images.unsplash.com/photo-1596302894958-327b61a1a742?q=80&w=2070&auto=format&fit=crop';
const WIRE_OVERLAY = '/wireframe.png'; 
const FALLBACK_WIRE = 'https://images.unsplash.com/photo-1534723455112-2521c7e9de5e?q=80&w=2070&auto=format&fit=crop';
const TECH_BACKGROUND = '/bg_tech.jpg'; 
const FALLBACK_TECH = 'https://images.unsplash.com/photo-1550745165-9bc0b252723c?q=80&w=2070&auto=format&fit=crop'; 
const INFO_CARD_IMG = '/info_card.jpg';
const FALLBACK_CARD = 'https://images.unsplash.com/photo-1593345470776-904d96a7516a?q=80&w=2070&auto=format&fit=crop'; 

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div style={{ height: '200vh', background: '#0a0a0a', color: 'white', fontFamily: 'Oswald, sans-serif' }}>
      
      <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        
        <motion.div 
          style={{ 
            y,
            position: 'absolute', inset: 0, 
            backgroundImage: `url(${HERO_BG}), url(${FALLBACK_BG})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            filter: 'brightness(0.4)'
          }} 
        />
        
        <motion.div 
          style={{ 
            y: y2, 
            position: 'absolute', inset: 0, 
            backgroundImage: `url(${WIRE_OVERLAY}), url(${FALLBACK_WIRE})`,
            backgroundSize: 'cover', 
            backgroundBlendMode: 'overlay', 
            opacity: 0.1,
          }}
        />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '10px', color: '#00F2FF', textShadow: '0 0 20px rgba(0, 242, 255, 0.6)' }}
          >
            SKYNEX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ fontSize: '1.5rem', color: '#aaa', marginTop: '20px', letterSpacing: '5px' }}
          >
            MODELOS 3D REALISTAS | DADOS DE MERCADO AO VIVO | TECNOLOGIA DE PONTA
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ marginTop: '50px' }}
          >
            <Link to="/inspect" style={{ textDecoration: 'none' }}>
              <button style={{ 
                padding: '15px 40px', 
                fontSize: '1.2rem', 
                background: '#4caf50', 
                color: 'white', 
                border: '3px solid #66bb6a', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)'
              }}>
                INSPECIONAR ARSENAL
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'relative', height: '100vh', zIndex: 20 }}>
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ 
              position: 'absolute', inset: 0, 
              backgroundImage: `url(${TECH_BACKGROUND}), url(${FALLBACK_TECH})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              filter: 'brightness(0.3)', 
            }} 
        />
        
        <div style={{ position: 'relative', height: '100vh', maxWidth: '1200px', margin: '0 auto', zIndex: 20, display: 'flex', alignItems: 'center', padding: '0 40px' }}>
          <div style={{ flex: 1.5, textAlign: 'left', paddingRight: '50px', minWidth: '400px', zIndex: 5 }}>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '3rem', color: '#fff', borderBottom: '3px solid #00F2FF', paddingBottom: '10px', marginBottom: '30px' }}
            >
              VISUALIZAÇÃO EM TEMPO REAL
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#aaa' }}
            >
              Este projeto utiliza renderização de modelos 3D de alta performance. 
              Simulamos com precisão os reflexos de materiais (metal, rugosidade) para o sistema de skins.
              Os dados de raridade, float e preço são consumidos via API Externa para uma listagem autêntica e dinâmica.
            </motion.p>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', marginLeft: 'auto', zIndex: 5 }}>
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              style={{ 
                backgroundImage: `url(${INFO_CARD_IMG}), url(${FALLBACK_CARD})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '450px',
                border: '4px solid #00F2FF',
                borderRadius: '15px', 
                boxShadow: '0 0 50px rgba(0, 242, 255, 0.5)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '20px', position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end' }}>
                <h3 style={{ color: '#00F2FF', margin: 0, fontSize: '1.5rem', borderBottom: '2px solid' }}>NEXT LEVEL RENDERING</h3>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}