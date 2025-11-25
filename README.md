<div align="center">

<p align="center">
<img src="docs/banner.gif" alt="CS2 Viewer Banner" width="100%" style="border-radius: 10px; box-shadow: 0 0 30px rgba(0, 242, 255, 0.3); border: 1px solid rgba(255,255,255,0.1);" />
</p>

<h1 align="center">
<img src="https://readme-typing-svg.herokuapp.com?font=Oswald&weight=900&size=50&duration=3000&pause=1000&color=00F22F&center=true&vCenter=true&width=1000&lines=SKYNEX" alt="Typing SVG" />
</h1>

<p align="center">
<strong>A Próxima Geração de Visualizadores de Skins: Performance e Fidelidade Gráfica.</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/React_Three_Fiber-100000?style=for-the-badge&logo=react&logoColor=FF4500" alt="R3F">
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=ffffff" alt="Three.js">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/API_REST-FF6C37?style=for-the-badge&logo=openapi&logoColor=white" alt="REST API">
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
</p>

</div>

---

## 🎯 Sobre o Projeto

O **Skynex CS2 Inventory Viewer** é um projeto de simulação de mercado e inspeção de skins em tempo real, demonstrando proficiência em **gráficos 3D no navegador**, **PBR materials**, **animações**, e **consumo de APIs externas**.

Ele recria a experiência de inspeção do Counter-Strike 2, permitindo ao usuário:

- Alternar armas (AK-47, AWP, M4A1-S)
- Visualizar modelos 3D realistas
- Ajustar o **Float Value** e observar seu impacto no desgaste da skin
- Carregar skins e dados de uma API externa
- Vivenciar uma interface moderna com animações suaves

---

## ✨ Destaques Técnicos

| Feature | Descrição | Tecnologia |
|--------|-----------|------------|
| **Renderização 3D** | Modelos `.glb` com alta performance no navegador | React Three Fiber / Three.js |
| **Material Simulado** | Simulação de brilho metálico, roughness e desgaste | PBR / Float Value Logic |
| **Consumo de Dados** | Listagem dinâmica de skins através de API externa | fetch API |
| **Float Slider** | Desgaste em tempo real alterando shaders do material | React useState / Three.js |
| **UX Cinematográfico** | Transições e landing page com parallax | Framer Motion |

---

## 📸 Screenshots & Showcase

| Tela | Imagem |
|------|----------------|
| **Landing Page** | <img src="docs/print1.png" alt="Home" width="100%" style="margin: 10px; border-radius: 8px; border: 1px solid #444;"> |
| **Card** | <img src="docs/print2.png" alt="Card" width="100%" style="margin: 10px; border-radius: 8px; border: 1px solid #444%;"> |
| **Inspeção 3D** | <img src="docs/print3.png" alt="Painel" width="100%" style="margin: 10px; border-radius: 8px; border: 1px solid #444%;"> |

---

## 🛠️ Instalação e Execução

### 📌 Pré-requisitos

- **Node.js 16+**

---

### 1. Clonar e Instalar

```bash
# 1. Clone o repositório
git clone https://github.com/gabrielbeloni06/Skynex
cd cs2-market

# 2. Instalar dependências
npm install
