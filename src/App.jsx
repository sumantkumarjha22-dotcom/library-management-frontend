import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import {Userprofile} from './pages/userprofile'
import { Search } from './pages/Search'
import Admin from '../admine/Admin'
import Ai from './pages/Ai'
import { Routes, Route } from 'react-router-dom'
import {AllBookForAdmine} from '../admine/AllBookForAdmine'
   function App() {

  

  return (
     <>
    
     <Routes>
      
       <Route path="/" element={<><Navbar/><Home /></>} />
      <Route path="/login" element={  <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/home' element={<><Navbar/><Home/></>}/>
      <Route path="/userprofile" element={<><Navbar/><Userprofile/></>}/>
      <Route path="/ai" element={<><Navbar/><Ai/></>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/search' element={<><Navbar/><Search/></>}/>
      <Route path='/allbook' element={<><AllBookForAdmine/></>}/>



     </Routes>

     </>
   
 )}
export default App
