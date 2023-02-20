import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserState } from '../../context/User'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  const { user, setUser } = UserState();
  return (
    <>
      {
        user &&
        <div>
          <div className="page-wrapper">
            <Header />
            <div className="page-body-wrapper">
              <Sidebar />
              <div className="page-body"><Outlet /></div>
              <Footer />
            </div>
          </div>
        </div>
      }
      {
        !user &&
        <div>Loading...</div>
      }
    </>
  )
}

export default Layout