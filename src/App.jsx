import { useState } from 'react'
import UploadPage from './Pages/UploadPage'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import View from './Pages/View'
import VideoView from './Pages/VideoView'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<UploadPage/>}/>
        <Route path='/view' element={<View/>}/>
        <Route path='/VideoView/:id' element={<VideoView/>}/>   
      </Routes>
    </Router>
      {/* <UploadPage/> */}
    </>
  )
}

export default App
