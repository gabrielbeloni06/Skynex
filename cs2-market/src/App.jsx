import CS2Viewer from './CS2Viewer'
import HomePage from './HomePage' 
import { Routes, Route } from 'react-router-dom' 
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inspect" element={<CS2Viewer />} /> 
    </Routes>
  )
}

export default App