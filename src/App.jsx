import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainlayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
