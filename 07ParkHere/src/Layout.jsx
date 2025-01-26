import React from 'react'
import Header from 'd:/React.js + Projects/07ParkHere/parkhere/src/components/header/header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout