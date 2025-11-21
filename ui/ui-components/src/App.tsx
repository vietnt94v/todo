import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ButtonDemo } from './pages/ButtonDemo'
import { InputDemo } from './pages/InputDemo'
import { TableDemo } from './pages/TableDemo'
import { ModalDemo } from './pages/ModalDemo'
import { DrawerDemo } from './pages/DrawerDemo'
import { DropdownDemo } from './pages/DropdownDemo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/button" element={<ButtonDemo />} />
        <Route path="/input" element={<InputDemo />} />
        <Route path="/table" element={<TableDemo />} />
        <Route path="/modal" element={<ModalDemo />} />
        <Route path="/drawer" element={<DrawerDemo />} />
        <Route path="/dropdown" element={<DropdownDemo />} />
      </Routes>
    </Router>
  )
}

export default App
