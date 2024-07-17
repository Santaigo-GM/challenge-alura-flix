import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import RegistrarModal from '../components/RegistrarModal'

function Myroutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/registrar' element={<RegistrarModal />} />
                </Routes>
            </BrowserRouter>

        </>

    )
}

export default Myroutes